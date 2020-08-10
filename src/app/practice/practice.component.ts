import { Component, OnInit } from '@angular/core';
import { MainService } from '../main-service.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import {
  HttpClient
} from '@angular/common/http';
import { QuestionService } from '../service/question.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
})
export class PracticeComponent implements OnInit {
  enteredAnswer: any = '';
  buttonValue: string;
  questions = {
    answeredQuestions: 0,
    totalQuestions: 0,
    answerPercentage: 0
  };
  questionSplit: any[];
  randomAnswer: any;
  isShowOperator = false;
  isConfigLoaded = Promise.resolve(false);
  questionConfiguration: any;
  levelCount = 0;
  operatorClassRequired: boolean;
  question: any;
  deviceHeight: number;
  isQuestionLoaded = false;
  selectedLevel = '';
  isAutoMode: boolean;
  constructor(public service: MainService, public vibration: Vibration, private httpClient: HttpClient, public questionService: QuestionService, public platform: Platform) { }

  ngOnInit() {
    this.deviceHeight = this.platform.height() - 250;
  }

  enteredNumber(numbers): void {
    this.enteredAnswer = numbers;
  }

  checkAnswer(): void {
    if (!this.enteredAnswer) {
      this.showWrongAnswer();
      return;
    }
    if (!this.isShowOperator && this.enteredAnswer === '-'){
      this.showWrongAnswer();
      return;
    }
    let validAnswer = false;
    if (this.question.answerType === 1 || this.question.answerType === 2) {
      validAnswer = this.questionService.evaluteAnswer(this.question.question, this.enteredAnswer);
    }
    if (validAnswer || this.enteredAnswer === this.question.answer) {
      this.buttonValue = 'right';
      this.service.onCorrectAnswer();
      setTimeout(() => {
        this.questions.answeredQuestions += 1;
        this.resetData();
        this.questionGeneration();
      }, 500);
    } else {
      this.showWrongAnswer();
    }
  }

  showWrongAnswer(): void {
    this.buttonValue = 'wrong';
    this.service.onWrongAnswer();
    setTimeout(() => {
      this.resetData();
    }, 500);
    if (this.service.settings.vibration) {
      this.vibration.vibrate(500);
    }
  }

  resetData(fromApp = false): void {
    this.enteredAnswer = '';
    this.buttonValue = '';
    if (fromApp) {
      this.vibration.vibrate(500);
    }
  }
  skip(): void {
    this.buttonValue = 'skip';
    this.enteredAnswer = this.question.answer;
    this.isQuestionLoaded = false;
    setTimeout(() => {
      this.questionSplit = [];
      this.resetData();
      this.questionGeneration();
      this.isQuestionLoaded = true;
    }, 1000);
  }

  questionGeneration(): any {
    if (this.isAutoMode && +(((this.questions.answeredQuestions / this.questions.totalQuestions) * 100).toFixed(0)) >=
      this.questionConfiguration.practiceModeConfiguration.auto.increaseComplexityPercentage &&
      this.questions.answeredQuestions > this.questionConfiguration.practiceModeConfiguration.auto.minimumQuestionNeedToAnswer) {
      this.selectedLevel = this.selectedLevel === 'easy' ? 'medium' : 'hard';
      this.questionConfiguration.practiceModeConfiguration.auto.minimumQuestionNeedToAnswer
        = this.questionConfiguration.practiceModeConfiguration.auto.minimumQuestionNeedToAnswer * 2;
    }
    if (this.isAutoMode && (((this.questions.answeredQuestions / this.questions.totalQuestions) * 100).toFixed(0) <=
      this.questionConfiguration.practiceModeConfiguration.auto.decreaseComplexityPercentage) &&
      this.questions.answeredQuestions >
      this.questionConfiguration.practiceModeConfiguration.auto.minimumQuestionNeedToAnswer && this.selectedLevel !== 'easy') {
      this.selectedLevel = this.selectedLevel === 'hard' ? 'medium' : 'easy';
      this.questionConfiguration.practiceModeConfiguration.auto.minimumQuestionNeedToAnswer
        = (this.questionConfiguration.practiceModeConfiguration.auto.minimumQuestionNeedToAnswer / 2).toFixed(0);
    }
    if (this.question !== undefined) {
      this.question.answerType = 1;
    }
    this.question = this.questionService.generateQuestion(this.questionConfiguration.practiceModeConfiguration[this.selectedLevel]);
    this.questionSplit = this.question.question.split(' ');
    this.isQuestionLoaded = true;
    this.isShowOperator = false;

    switch (this.question.answerType) {
      case 2:
        this.isShowOperator = true;
        break;
      case 5:
        this.isQuestionLoaded = false;
        break;
      default:
        break;
    }
    if (this.question.answerType === 3 || this.question.answerType === 4) {
      this.operatorClassRequired = false;
    } else {
      this.operatorClassRequired = true;
    }
    this.questions.totalQuestions += 1;
    this.isConfigLoaded = Promise.resolve(true);
  }
  onQuestionLoaded(event): void {
    this.isQuestionLoaded = true;
  }
  onSelect(event): void {
    this.selectedLevel = event;
    this.selectedLevel === 'dynamic' ? (this.isAutoMode = true, this.selectedLevel = 'easy') : (this.isAutoMode = false, this.selectedLevel = this.selectedLevel);
    this.httpClient.get('https://mathwars.launchship.com/assets/config.json').subscribe((serverResult: any) => {
      serverResult = null;
      if (!serverResult) {
        this.httpClient.get('/assets/config.json').subscribe((result: any) => {
          this.questionConfiguration = result;
          this.questionGeneration();
        });
      } else {
        this.questionConfiguration = serverResult;
        this.questionGeneration();
      }
    });
  }
  onAction(action): void {
    switch (action.operation) {
      case 'skip': this.skip(); break;
      case 'clear': this.resetData(true); break;
      case 'submit': this.checkAnswer(); break;
    }
  }
}
