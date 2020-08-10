import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { SocketService } from '../service/socket.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../main-service.service';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  userId: any;
  userName: any;
  playerList: any;
  public endGame = false;
  public gameStarted = false;
  public battlePlayers: any;
  public gameStatus: any;
  public battleResponse: any;
  public gameScore: any;
  public currentQuestion = 0;
  public questionForm: any;
  isShowOperator: boolean;
  questionSplit: any;
  enteredAnswer = '';
  index: any;
  buttonValue: string;
  subscribe: Subscription;
  operatorClassRequired = true;
  isQuestionLoaded = true;
  imgUrl = '';
  deviceHeight: number;
  constructor(private socketService: SocketService, private formBuilder: FormBuilder, private router: Router,
    public mainService: MainService, public cd: ChangeDetectorRef, public platform: Platform) {
    this.subscribe = this.mainService.getLeaveRoomStatus().subscribe(res => {
      if (res && this.gameStatus) {
        this.socketService.leaveGame(this.userId, this.gameStatus.gameId);
      }
    });
    this.questionForm = this.formBuilder.group({
      answer: ''
    });
    this.imgUrl = this.mainService.userData?.userDetails?.avatar !== undefined ? this.socketService.BASE_URL + '/' + this.mainService.userData?.userDetails?.avatar : '';
  }

  ngOnInit() {
    this.deviceHeight = this.platform.height() - 350;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.userId = currentUser.userId;
      this.userName = currentUser.userName;
      this.establishSocketConnection();
      this.getPlayerList();
    }
  }
  onQuestionLoaded(event): void {
    this.isQuestionLoaded = true;
  }
  async establishSocketConnection() {
    try {
      await this.socketService.connectSocket(this.userId);
      this.battle();
    } catch (error) {
      alert('Something went wrong');
    }
  }
  getPlayerList(): void {
    this.socketService.getPlayerList(this.userId).subscribe((playerListResponse: any) => {
      this.playerList = playerListResponse.playerList;
    });
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

  listenForBattle(): void {
    this.socketService.receiveQuestions().subscribe((socketResponse: any) => {
      this.battleResponse = socketResponse;
      localStorage.setItem('gameId', JSON.stringify(this.battleResponse.gameId));

      this.battlePlayers = socketResponse.players;
      this.gameStarted = true;
      this.setQuestionStatus();
      this.mainService.startTimer(this.battlePlayers.interval);
    });
  }
  listenForStatus(): void {
    this.socketService.getBattleStatus().subscribe((socketResponse: any) => {
      this.gameStatus = socketResponse;
      localStorage.setItem('gameStatus', JSON.stringify(this.gameStatus));
    });
  }
  listenForScore(): void {
    this.socketService.getBattleScore().subscribe((socketResponse: any) => {
      this.gameScore = socketResponse;
      this.battlePlayers = socketResponse.players;
    });
  }
  imageUrl(user) {
    return user?.userdetails[0]?.avatar !== undefined ? this.socketService.BASE_URL + '/' + user?.userdetails[0]?.avatar : false;
  }
  listenForEndGame(): void {
    const that = this;
    this.socketService.endGame().subscribe((socketResponse: any) => {
      that.battlePlayers = this.battlePlayers.sort((a, b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
      that.battleResponse = null;
      localStorage.removeItem('canClosePage');
      that.mainService.clearTimer();
      that.endGame = true;
      that.cd.detectChanges();

      setTimeout(() => {
        that.gameStatus = undefined;
        that.battlePlayers = [];
        that.router.navigate(['home']);
      }, 30000000);
    });
  }
  setQuestionStatus(): void {
    if (this.battleResponse.questions[this.currentQuestion].answerType === 5) {
      this.isQuestionLoaded = false;
    }
  }
  submitQuestion(): void {
    this.currentQuestion++;
    this.setQuestionStatus();
    if (this.enteredAnswer === '×') {
      this.enteredAnswer = '*';
    }
    if (this.enteredAnswer === '÷') {
      this.enteredAnswer = '/';
    }
    this.socketService.updateAnswer(
      this.battleResponse.gameId,
      this.battleResponse.lobbyId,
      this.userId,
      this.battleResponse.questions[this.index].question,
      this.index,
      this.enteredAnswer,
        this.battleResponse.questions[this.index].answerType
    );
    this.enteredAnswer = '';
  }

  skip(): void {
    this.submitQuestion();
  }

  splittingQuestion(question: any, index: any): void {
    this.index = index;
    this.questionSplit = question.question.split(' ');
    switch (question.answerType) {
      case 2:
        this.isShowOperator = true;
        break;
      default:
        this.isShowOperator = false;
        break;
    }
    if (question.answerType === 3 || question.answerType === 4) {
      this.operatorClassRequired = false;
    } else {
      this.operatorClassRequired = true;
    }
    return this.questionSplit;
  }

  enteredNumber(numbers): void {
    this.enteredAnswer = numbers;
  }

  resetData(): void {
    this.enteredAnswer = '';
  }
  getAvatarUrl(url): any {
    return this.socketService.BASE_URL + '/' + url;
  }
}
