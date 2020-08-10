const queryHandler = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');
const passwordHash = require('./../utils/password-hash');
const fs = require('fs');
'use strict';
class RouteHandler{

	async userNameCheckHandler(request, response){
		const username = request.body.username;
		if (username === "") {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.USERNAME_NOT_FOUND
			});
		} else {
			try {
				const count = await queryHandler.userNameCheck( {
					username : username.toLowerCase()
				});
				if (count > 0) {
					response.status(200).json({
						error : true,
						message : CONSTANTS.USERNAME_AVAILABLE_FAILED
					});
				} else {
					response.status(200).json({
						error : false,
						message : CONSTANTS.USERNAME_AVAILABLE_OK
					});
				}
			} catch ( error ){
				response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
					error : true,
					message : CONSTANTS.SERVER_ERROR_MESSAGE
				});
			}
		}
	}

	async loginRouteHandler(request, response){
		const data = {
			username : (request.body.username).toLowerCase(),
			password : request.body.password
		};
		if(data.username === '' || data.username === null) {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.USERNAME_NOT_FOUND
			});
		}else if(data.password === '' || data.password === null) {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.PASSWORD_NOT_FOUND
			});
		} else {
			try {
				const result = await queryHandler.getUserByUsername(data.username);
				if(result ===  null || result === undefined) {
					response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
						error : true,
						message : CONSTANTS.USER_LOGIN_FAILED
					});
				} else {
					if( passwordHash.compareHash(data.password, result.password)) {
						await queryHandler.makeUserOnline(result._id);
						response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
							error : false,
							userId : result._id,
							userDetails: {
								"username": result.username,
								"avatar": result.avatar,
								"profileName": result.profileName
							},
							message : CONSTANTS.USER_LOGIN_OK
						});
					} else {
						response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
							error : true,
							message : CONSTANTS.USER_LOGIN_FAILED
						});
					}
				}
			} catch (error) {
				response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
					error : true,
					message : CONSTANTS.USER_LOGIN_FAILED
				});
			}
		}
	}

	async registerRouteHandler(request, response){
		const data = {
			username : (request.body.username !== undefined) ? (request.body.username).toLowerCase() : '',
			email : (request.body.email !== undefined) ? (request.body.email).toLowerCase() : '',
			password : (request.body.password !== undefined) ?  request.body.password : ''
		};
		if(data.username === '') {
			response.status(CONSTANTS.BAD_REQUEST).json({
				error : true,
				message : CONSTANTS.USERNAME_NOT_FOUND
			});
		}
    else if(data.email === '') {
      response.status(CONSTANTS.BAD_REQUEST).json({
        error : true,
        message : CONSTANTS.EMAIL_NOT_FOUND
      });
    }
    else if(data.password === '') {
			response.status(CONSTANTS.BAD_REQUEST).json({
				error : true,
				message : CONSTANTS.PASSWORD_NOT_FOUND
			});
		} else {
      const count = await queryHandler.userNameCheck( {
        username : data.username.toLowerCase()
      });
      const emailCount = await queryHandler.userNameCheck( {
        email : data.email.toLowerCase()
      });
      if(count > 0) {
        response.status(200).json({
          error : true,
          message : CONSTANTS.USERNAME_AVAILABLE_FAILED
        });
      }
      else if(emailCount > 0) {
        response.status(200).json({
          error : true,
          message : CONSTANTS.EMAIL_AVAILABLE_FAILED
        });
      }
      else {
        try {
          data.online = 'Y' ;
          data.socketId = '' ;
          data.password = passwordHash.createHash(data.password);
          const result = await queryHandler.registerUser(data);
          if (result === null || result === undefined) {
            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
              error : false,
              message : CONSTANTS.USER_REGISTRATION_FAILED
            });
          } else {
			  const userDetails = await queryHandler.getUserByUsername(data.username);
            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
              error : false,
              userId : result.insertedId,
				userDetails: {
					"username": userDetails.username,
					"avatar": userDetails.avatar,
					"profileName": userDetails.profileName
				},
              message : CONSTANTS.USER_REGISTRATION_OK
            });
          }
        } catch ( error ) {
          console.log(error);
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error : true,
            message : CONSTANTS.SERVER_ERROR_MESSAGE
          });
        }
      }

		}
	}

	async userSessionCheckRouteHandler(request, response){
		let userId = request.body.userId;
		if (userId === '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.USERID_NOT_FOUND
			});
		} else {
			try {
				const result = await queryHandler.userSessionCheck({ userId : userId });
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error : false,
					username : result.username,
					message : CONSTANTS.USER_LOGIN_OK
				});
			} catch(error) {
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					message : CONSTANTS.USER_NOT_LOGGED_IN
				});
			}
		}
	}

	async getMessagesRouteHandler(request, response){
		let userId = request.body.userId;
		let toUserId = request.body.toUserId;
		if (userId == '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.USERID_NOT_FOUND
			});
		}else{
			try {
				const messagesResponse = await queryHandler.getMessages({
					userId:userId,
					toUserId: toUserId
				});
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error : false,
					messages : messagesResponse
				});
			} catch ( error ){
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					messages : CONSTANTS.USER_NOT_LOGGED_IN
				});
			}
		}
	}

	/*async profileRouteHandler(request, response){
		let userId = request.body.userId;
		let profileName = request.body.profileName;
		let avatar = request.body.avatar;
		console.log(request.body);
		let buff = new Buffer(avatar, 'base64');
		fs.writeFileSync('uploads/' + userId + '.png', buff);
		response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
			error : false,
			messages : fs
		});
	}*/
	routeNotFoundHandler(request, response){
		response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
			error : true,
			message : CONSTANTS.ROUTE_NOT_FOUND
		});
	}
}

module.exports = new RouteHandler();
