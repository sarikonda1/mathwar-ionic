import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {AuthenticationService} from '@app/_services';
import {SocketService} from '@app/_services/socket.service';
import {FormBuilder} from "@angular/forms";
// const SOCKET_ENDPOINT = 'https://mathwars.launchship.com';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  public userId: any;
  public userName: any;
  public playerList: any;
  public battleResponse: any;
  public gameScore: any;
  public battlePlayers: any;
  public gameStatus: any;
  public questionForm: any;
  public currentQuestion =  0;
  public endGame = false;
  public gameStarted = false;
    constructor(private socket: Socket, private socketService: SocketService, private formBuilder: FormBuilder,) {
      this.questionForm = this.formBuilder.group({
        answer: ''
      });
    }
    ngOnInit() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.userId = currentUser.userId;
      this.userName = currentUser.userName;
      this.establishSocketConnection();
      this.getPlayerList();

    }

  async establishSocketConnection() {
    try {
             await this.socketService.connectSocket(this.userId);
    } catch (error) {
      alert('Something went wrong');
    }
  }
  getPlayerList(): void {
    this.socketService.getPlayerList(this.userId).subscribe((playerListResponse: any) => {
     this.playerList = playerListResponse.playerList;
    });
  }
  listenForBattle(): void {
    this.socketService.receiveQuestions().subscribe((socketResponse: any) => {
      this.battleResponse = socketResponse;
      this.battlePlayers = socketResponse.players;
      this.gameStarted = true;
    });
  }
  listenForStatus(): void {
    this.socketService.getBattleStatus().subscribe((socketResponse: any) => {
      this.gameStatus = socketResponse;
    });
  }
  listenForScore(): void {
    this.socketService.getBattleScore().subscribe((socketResponse: any) => {
      this.gameScore = socketResponse;
      this.battlePlayers = socketResponse.players;
    });
  }
  listenForEndGame(): void {
    this.socketService.endGame().subscribe((socketResponse: any) => {
      this.endGame = true;
      this.gameStatus = undefined;
    });
  }
  submitQuestion(questionNumber, formData): void {
      this.currentQuestion++;
      this.socketService.updateAnswer(
        this.battleResponse.gameId,
        this.userId,
        this.battleResponse.questions[questionNumber].question,
        questionNumber,
        formData.answer
      );
    this.questionForm.reset();
  }
  async battle() {
    this.endGame = false;
    this.gameStarted = false;
    await this.socketService.startBattle(this.userId);
    this.listenForStatus();
    this.listenForBattle();
    this.listenForScore();
    this.listenForEndGame();
  }
}
