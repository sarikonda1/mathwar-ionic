import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';


/* importing interfaces ends */

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private BASE_URL = 'https://mathwars.launchship.com';
  private socket;

  constructor() { }

  /*
  * Method to connect the users to socket
  */
  connectSocket(userId: string): void {
    this.socket = io(this.BASE_URL, { query: `userId=${userId}` });
  }

  /*
 * Method to emit the logout event.
 */
  logout(userId: { userId: string}): Observable<any> {
    this.socket.emit('logout', userId);
    return new Observable(observer => {
      this.socket.on('logout-response', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  /*
 * Method to receive player-list-response event.
 */
  getPlayerList(userId: string = null): Observable<any> {
    if (userId !== null) {
      this.socket.emit('player-list', { userId: userId });
    }
    return new Observable(observer => {
      this.socket.on('player-list-response', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  /*
* Method to emit the add-messages event.
*/
  sendMessage(message: any): void {
    this.socket.emit('add-message', message);
  }

  /*
* Method to receive add-message-response event.
*/
  receiveQuestions(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('battle-questions', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
  getBattleStatus(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('battle-status', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  getBattleScore(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('battle-score', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  endGame(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('end-game', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  startBattle(userId: any): void {
    this.socket.emit('start-battle', userId);
  }
  updateAnswer(gameId: any,userId: any, question: any, questionNumber:any, answer: any): void {
    this.socket.emit('update-answer', { gameId: gameId, userId: userId, question: question, questionNumber: questionNumber,answer: answer });
  }
}
