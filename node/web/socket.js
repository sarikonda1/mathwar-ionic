'use strict';

const path = require('path');
const mathjs = require('mathjs');
const fs = require('fs');

const queryHandler = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');
const questionService = require('./../handlers/question-service')

class Socket {

    constructor(socket) {
        this.io = socket;
    }

    socketEvents() {

        this.io.on('connection', (socket) => {
            /* Get the user's Chat list	*/
            socket.on(`player-list`, async (data) => {
                if (data.userId == '') {
                    this.io.emit(`player-list-response`, {
                        error: true,
                        message: CONSTANTS.USER_NOT_FOUND
                    });
                } else {
                    try {
                        const [UserInfoResponse, playerlistResponse] = await Promise.all([
                            queryHandler.getUserInfo({
                                userId: data.userId,
                                socketId: false
                            }),
                            queryHandler.getPlayerList(socket.id)
                        ]);
                        this.io.to(socket.id).emit(`player-list-response`, {
                            error: false,
                            singleUser: false,
                            playerList: playerlistResponse
                        });
                        socket.broadcast.emit(`player-list-response`, {
                            error: false,
                            singleUser: true,
                            playerList: UserInfoResponse
                        });
                    } catch (error) {
                        this.io.to(socket.id).emit(`player-list-response`, {
                            error: true,
                            playerList: []
                        });
                    }
                }
            });

            /**
             * send the messages to the user
             */
            socket.on(`add-message`, async (data) => {
                if (data.message === '') {
                    this.io.to(socket.id).emit(`add-message-response`, {
                        error: true,
                        message: CONSTANTS.MESSAGE_NOT_FOUND
                    });
                } else if (data.fromUserId === '') {
                    this.io.to(socket.id).emit(`add-message-response`, {
                        error: true,
                        message: CONSTANTS.SERVER_ERROR_MESSAGE
                    });
                } else if (data.toUserId === '') {
                    this.io.to(socket.id).emit(`add-message-response`, {
                        error: true,
                        message: CONSTANTS.SELECT_USER
                    });
                } else {
                    try {
                        const [toSocketId, messageResult] = await Promise.all([
                            queryHandler.getUserInfo({
                                userId: data.toUserId,
                                socketId: true
                            }),
                            queryHandler.insertMessages(data)
                        ]);
                        this.io.to(toSocketId).emit(`add-message-response`, data);
                    } catch (error) {
                        this.io.to(socket.id).emit(`add-message-response`, {
                            error: true,
                            message: CONSTANTS.MESSAGE_STORE_ERROR
                        });
                    }
                }
            });


            /**
             * Logout the user
             */
            socket.on('logout', async (data) => {
                const userId = data.userId;
                try {
                    await queryHandler.logout(userId);
                    this.io.to(socket.id).emit(`logout-response`, {
                        error: false,
                        message: CONSTANTS.USER_LOGGED_OUT,
                        userId: userId
                    });

                    socket.broadcast.emit(`player-list-response`, {
                        error: false,
                        userDisconnected: true,
                        userid: userId
                    });
                } catch (error) {
                    this.io.to(socket.id).emit(`logout-response`, {
                        error: true,
                        message: CONSTANTS.SERVER_ERROR_MESSAGE,
                        userId: userId
                    });
                }
            });

            socket.on('start-battle', async (userId) => {
                const count = await queryHandler.openRoomCheck({
                    status: 'open'
                });
                const data = await queryHandler.startBattle(userId, !(count > 0));
                const gameId = (!count) ? data.insertedId : data._id;
                var rooms = this.io.sockets.adapter.sids[socket.id];
                for(var room in rooms) {
                    socket.leave(room);
                }
                socket.join(gameId);
                const userExists = await queryHandler.validateUserJoin(userId, gameId);
                if(!userExists) {
                    queryHandler.addPlayerToGame(userId, gameId);
                }
                const playerCount = await queryHandler.getPlayerCount(gameId);
                if (playerCount >= CONSTANTS.TOTAL_PLAYERS_COUNT) {

                    await queryHandler.changeRoomStatus(gameId, 'inprogress');
                    let questions = await questionService.getAll();
                    var gamePlayers = await queryHandler.getGamePlayers(gameId);
                    await queryHandler.updateGameQuestions(gameId, questions);
                    this.io.to(gameId).emit(`battle-questions`, {
                        questions: questions,
                        interval: CONSTANTS.GAME_INITERVAL,
                        gameId: gameId,
                        players: gamePlayers,
                        playersCount: playerCount
                    });
                    const that = this;
                    setTimeout(function () {
                        that.io.to(gameId).emit(`end-game`, {gameId: gameId});
                        queryHandler.changeRoomStatus(gameId, 'completed');
                    }, CONSTANTS.GAME_INITERVAL * 1000);
                } else {
                    this.io.to(gameId).emit(`battle-status`, {
                        gameId: gameId,
                        playersCount: playerCount,
                        // message: "Waiting for " + (CONSTANTS.TOTAL_PLAYERS_COUNT - playerCount) + " more Player(s)"
                        message: 'Waiting for players.'
                    });
                }
            });

            socket.on('leave-lobby',async (data) => {
                socket.leave(data.lobbyId);
                await queryHandler.removeUserFromLobby(data);
            });

            socket.on('join-lobby',async (userId) => {
                const lobbyConfig = {mode: 'easy', maxPlayerCount: CONSTANTS.TOTAL_PLAYERS_COUNT};
                const isOpenLobbyAvailable = await queryHandler.isOpenLobbyAvailable({
                    status: 'open',
                    lobbyConfig: lobbyConfig,
                });
                const lobby = await queryHandler.createLobby(lobbyConfig, !(isOpenLobbyAvailable > 0));
                const lobbyId = (!isOpenLobbyAvailable) ? lobby.insertedId : lobby._id;
                const lobbyData = await queryHandler.addPlayerToLobby(userId, lobbyId);
                socket.join(lobbyId);
                if(lobbyData.users.length == CONSTANTS.TOTAL_PLAYERS_COUNT) {
                     await queryHandler.changeLobbyStatus(lobbyId, 'started');
                    let questions = await questionService.getAll();

                     const gameData = {
                       name: lobbyData.name,
                       status: 'inprogress',
                       questions: questions
                     };
                     const insertedGame = await queryHandler.startGame(gameData);
                     const gameId = insertedGame.insertedId;
                     for(let i=0; i < lobbyData.users.length; i++) {
                         await queryHandler.addPlayerToGame(lobbyData.users[i], gameId);
                     }

                    var gamePlayers = await queryHandler.getGamePlayers(gameId);

                    this.io.to(lobbyId).emit(`battle-questions`, {
                        questions: questions,
                        interval: CONSTANTS.GAME_INITERVAL,
                        gameId: gameId,
                        lobbyId: lobbyId,
                        players: gamePlayers,
                        playersCount: lobbyData.users.length
                    });
                    const that = this;
                    setTimeout(function () {
                        that.io.to(lobbyId).emit(`end-game`, {gameId: gameId,lobbyId:lobbyId});
                        queryHandler.changeRoomStatus(gameId, 'completed');
                        queryHandler.changeLobbyStatus(lobbyId, 'completed');
                    }, CONSTANTS.GAME_INITERVAL * 1000);
                }
                else {
                    this.io.to(socket.id).emit(`battle-status`, {
                        lobbyId: lobbyId,
                        playersCount: lobbyData.users.length,
                        message: 'Waiting for players.',
                        game_starts_in : 60
                    });
                }
            });


            socket.on('leave-battle', async (data) => {
                socket.leave(data.gameId);
            });
            socket.on('update-profile', async (data, callback) => {
                const userId = data.userId;
                const time = new Date().getTime();
                const profileName = data.profileName;
                const avatar = data.avatar;
                const oldAvatar = data.oldAvatar;
                const filePath = 'uploads/' + userId + '-' + time + '.png';
                /*const userOldInfo = await queryHandler.getUserById(userId);
                console.log(userOldInfo);*/
                if(oldAvatar) {
                    try {
                        fs.unlinkSync(oldAvatar);
                    }
                    catch(err) {
                        console.error(err)
                    }
                }
                var imageData = avatar.replace(/^data:image\/\w+;base64,/, '');
                let buff = new Buffer(imageData, 'base64');
                fs.writeFileSync(filePath, buff);


                const userData = await queryHandler.updateProfile({
                    userId: userId,
                    avatar: filePath,
                    profileName: profileName
                });
                callback(userData);
            });
            socket.on('update-answer', async (data) => {
                const question = data.question;
                const finalQuestion = question.replace("?", data.answer);
                let isValidAnswer = true;
                let correctAnswer = '';
                let questionParts;
                switch(data.answerType) {
                    case 3:
                        questionParts = finalQuestion.split(' ');
                        const difference = questionParts[1] - questionParts[0];
                        for(let i=1; i < questionParts.length; i++) {
                            if (questionParts[i] - questionParts[i - 1] != difference) {
                                isValidAnswer = false;
                                break;
                            }

                        }
                        break;
                    case 4:
                        questionParts = finalQuestion.split(' ');
                        const commonRatio = questionParts[1] / questionParts[0];
                        for(let i=1; i < questionParts.length; i++) {
                            if (questionParts[i] / questionParts[i - 1] != commonRatio) {
                                isValidAnswer = false;
                                break;
                            }

                        }
                        break;
                    case 5:
                        questionParts = finalQuestion.split('=');
                        const originalQuestion = questionParts[0].split(' ');
                        let finalAnswer;
                        let prepareFinalAnswer;
                        for(let i=0; i < originalQuestion.length;) {
                            if(i == 0) {
                                prepareFinalAnswer = originalQuestion[0] + originalQuestion[1] + originalQuestion[2];
                                i = 3;
                            }
                            else {
                                prepareFinalAnswer = finalAnswer +  originalQuestion[i] + originalQuestion[i+1];
                                i = i + 2;
                            }
                            finalAnswer = mathjs.evaluate(prepareFinalAnswer);
                        }
                        isValidAnswer = (mathjs.evaluate(finalAnswer) == mathjs.evaluate(questionParts[1]));
                        break;
                    default:
                        questionParts = finalQuestion.split('=');
                        isValidAnswer = (mathjs.evaluate(questionParts[0]) == mathjs.evaluate(questionParts[1]));
                }

               // if(isValidAnswer) {
                    await queryHandler.updateScore(data, isValidAnswer ? 1 : 0);
              //  }
               // await queryHandler.updateAnswer(data);
                const gamePlayers = await queryHandler.getGamePlayers(data.gameId);
                this.io.to(data.lobbyId).emit(`battle-score`, {
                    gameId: data.gameId,
                    lobbyId: data.lobbyId,
                    players: gamePlayers
                });
                /*else {
                  console.log("wrong answer");
                }*/

            });

            /**
             * sending the disconnected user to all socket users.
             */
            socket.on('disconnect', async () => {
                socket.broadcast.emit(`player-list-response`, {
                    error: false,
                    userDisconnected: true,
                    userid: socket.request._query['userId']
                });

            });

        });

    }

    socketConfig() {
        this.io.use(async (socket, next) => {
            try {
                await queryHandler.addSocketId({
                    userId: socket.request._query['userId'],
                    socketId: socket.id
                });
                next();
            } catch (error) {
                // Error
                console.error(error);
            }
        });

        this.socketEvents();
    }
}

module.exports = Socket;
