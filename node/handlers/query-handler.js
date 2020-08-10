'use strict';
const fs = require('fs');

class QueryHandler {

    constructor() {
        this.Mongodb = require("./../config/db");
    }

    userNameCheck(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                console.log(DB);
                DB.collection('users').find(data).count((error, result) => {
                    DB.close();
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    getUserByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').find({
                    username: username
                }).toArray((error, result) => {
                    DB.close();
                    if (error) {
                        reject(error);
                    }
                    resolve(result[0]);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    getUserById(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').find({
                    _id: ObjectID(userId)
                }).toArray((error, result) => {
                    DB.close();
                    if (error) {
                        reject(error);
                    }
                    resolve(result[0]);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    makeUserOnline(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').findAndModify({
                    _id: ObjectID(userId)
                }, [], {"$set": {'online': 'Y'}}, {new: true, upsert: true}, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    updateProfile(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').findAndModify({
                    _id: ObjectID(data.userId)
                }, [], {"$set": {'profileName': data.profileName, 'avatar': data.avatar}}, {
                    new: true,
                    upsert: true
                }, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    registerUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').insertOne(data, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    userSessionCheck(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').findOne({_id: ObjectID(data.userId), online: 'Y'}, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    getUserInfo({userId, socketId = false}) {
        let queryProjection = null;
        if (socketId) {
            queryProjection = {
                "socketId": true
            }
        } else {
            queryProjection = {
                "username": true,
                "online": true,
                "profileName": true,
                "avatar": true,
                '_id': false,
                'id': '$_id'
            }
        }
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').aggregate([{
                    $match: {
                        _id: ObjectID(userId)
                    }
                }, {
                    $project: queryProjection
                }
                ]).toArray((err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    socketId ? resolve(result[0]['socketId']) : resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    addSocketId({userId, socketId}) {
        const data = {
            id: userId,
            value: {
                $set: {
                    socketId: socketId,
                    online: 'Y'
                }
            }
        };
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').update({_id: ObjectID(data.id)}, data.value, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    getPlayerList(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').aggregate([{
                    $match: {
                        'socketId': {$ne: userId}
                    }
                }, {
                    $project: {
                        "username": true,
                        "profileName": true,
                        "avatar": 1,
                        "online": true,
                        '_id': false,
                        'id': '$_id'
                    }
                }
                ]).toArray((err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    insertMessages(messagePacket) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('messages').insertOne(messagePacket, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    getMessages({userId, toUserId}) {
        const data = {
            '$or': [
                {
                    '$and': [
                        {
                            'toUserId': userId
                        }, {
                            'fromUserId': toUserId
                        }
                    ]
                }, {
                    '$and': [
                        {
                            'toUserId': toUserId
                        }, {
                            'fromUserId': userId
                        }
                    ]
                },
            ]
        };
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('messages').find(data).sort({'timestamp': 1}).toArray((err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    logout(userID, isSocketId) {
        const data = {
            $set: {
                online: 'N'
            }
        };
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                let condition = {};
                if (isSocketId) {
                    condition.socketId = userID;
                } else {
                    condition._id = ObjectID(userID);
                }
                DB.collection('users').update(condition, data, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    startBattle(userId, isNewRoom) {
        const data = {
            name: (Math.random().toString(36).substring(8, 12) + Math.random().toString(36).substring(2, 6)).toUpperCase(),
            status: 'open',
            questions: {}
        }
        if (isNewRoom) {
            return new Promise(async (resolve, reject) => {
                try {
                    const [DB, ObjectID] = await this.Mongodb.onConnect();
                    DB.collection('games').insertOne(data, (err, result) => {
                        DB.close();
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                } catch (error) {
                    reject(error)
                }
            });
        } else {
            return new Promise(async (resolve, reject) => {
                try {
                    const [DB, ObjectID] = await this.Mongodb.onConnect();
                    DB.collection('games').findOne({status: 'open'}, (err, result) => {
                        DB.close();
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                } catch (error) {
                    reject(error)
                }
            });
        }
    }

    validateUserJoin(userId, gameId) {

        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                const data = {
                    userId: ObjectID(userId),
                    gameId: gameId
                }
                DB.collection('game_players').find(data).count((error, result) => {
                    DB.close();
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }
    addPlayerToGame(userId, gameId) {

        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                const data = {
                    userId: ObjectID(userId),
                    gameId: gameId,
                    score: 0
                }
                DB.collection('game_players').insertOne(data, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    openRoomCheck(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('games').find(data).count((error, result) => {
                    DB.close();
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    isOpenLobbyAvailable(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('lobby').find(data).count((error, result) => {
                    DB.close();
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    createLobby(lobbyConfig, isNewLobby) {
        const data = {
            name: (Math.random().toString(36).substring(8, 12) + Math.random().toString(36).substring(2, 6)).toUpperCase(),
            status: 'open',
            lobbyConfig: lobbyConfig
        }
        if (isNewLobby) {
            return new Promise(async (resolve, reject) => {
                try {
                    const [DB, ObjectID] = await this.Mongodb.onConnect();
                    DB.collection('lobby').insertOne(data, (err, result) => {
                        DB.close();
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                } catch (error) {
                    reject(error)
                }
            });
        } else {
            return new Promise(async (resolve, reject) => {
                try {
                    const [DB, ObjectID] = await this.Mongodb.onConnect();
                    DB.collection('lobby').findOne({status: 'open', lobbyConfig: lobbyConfig}, (err, result) => {
                        DB.close();
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                } catch (error) {
                    reject(error)
                }
            });
        }
    }

    getLobbyData(lobbyId) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('lobby').find({
                    _id: ObjectID(lobbyId)
                }).toArray((error, result) => {
                    DB.close();
                    if (error) {
                        reject(error);
                    }
                    resolve(result[0]);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    changeLobbyStatus(lobbyId, status) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('lobby').findAndModify({
                    _id: ObjectID(lobbyId)
                }, [], {"$set": {'status': status}}, {new: true, upsert: true}, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    removeUserFromLobby(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
               /* db.lobby.update({
               '_id': ObjectId("5f23eb9f99162170269cb0db")},
               { $pull: { "users" : { $in:["5f0c1925cbf920033f50ea78"] } } },false, true);*/
                DB.collection('lobby').findAndModify({
                    _id: ObjectID(data.lobbyId)
                }, [], {$pull:{users:{$in:[data.userId]}}}, {new: false, upsert: true}, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    startGame(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('games').insertOne(data, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    addPlayerToLobby(userId, lobbyId) {

        return new Promise(async (resolve, reject) => {
            try {
               const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('lobby').findAndModify({
                    _id: ObjectID(lobbyId),
                }, [], {$addToSet: { users: userId } },  {new: true, upsert: true}, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    getPlayerCount(gameId) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('game_players').find({gameId: ObjectID(gameId)}).count((error, result) => {
                    DB.close();
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    getGamePlayers(gameId) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('game_players').aggregate([
                    {$match: {gameId: ObjectID(gameId)}},
                    {$lookup: {from: "users", localField: "userId", foreignField: "_id", as: "userdetails"}},
                    {
                        $project: {
                            userId: 1,
                            gameId: 1,
                            score: 1,
                            "userdetails.profileName": true,
                            "userdetails.avatar": 1,
                            // dont include password here
                            //list all fields u need here
                            //now Probably show only "vehicles_name" from mapping.
                            "userdetails.username": 1 //if need full mapping then mapping:1
                        }
                    }
                ]).toArray((err, result) => {
                    // DB.collection('game_players').find({gameId: ObjectID(gameId)}).toArray( (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    changeRoomStatus(gameId, status) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('games').findAndModify({
                    _id: ObjectID(gameId)
                }, [], {"$set": {'status': status}}, {new: true, upsert: true}, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    updateGameQuestions(gameId, questions) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('games').findAndModify({
                    _id: ObjectID(gameId)
                }, [], {"$set": {'questions': questions}}, {new: true, upsert: true}, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    updateScore(data, score) {
        return new Promise(async (resolve, reject) => {
            try {
                const questionData = {
                    question: data.question,
                    answer: data.answer
                }
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('game_players').findAndModify({
                    gameId: ObjectID(data.gameId),
                    userId: ObjectID(data.userId)
                }, [], {$inc: {score: score}, $addToSet: { questions: questionData } },  {new: true, upsert: true}, (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    updateAnswer(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const questionData = {
                    question: data.question,
                    answer: data.answer
                }
                const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection('game_players').findAndModify({
                    gameId: ObjectID(data.gameId),
                    userId: ObjectID(data.userId)
                }, [], { $addToSet: { questions: questionData } },  (err, result) => {
                    DB.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value);
                });
            } catch (error) {
                reject(error)
            }
        });
    }
}

module.exports = new QueryHandler();
