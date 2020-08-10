import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main-service.service';
import { Vibration } from '@ionic-native/vibration/ngx';


@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss'],
})
export class SequenceComponent implements OnInit {
  enteredAnswer: any = '';
  sequenceTypes: { type: string }[];
  questions = {
    answeredQuestions: 0,
    totalQuestions: 0
  };
  question = [];
  questionSplit: string[];

  points = 0;
  buttonValue: string;
  randomAnswer: any;

  constructor(public service: MainService, public vibration: Vibration) { }

  ngOnInit() {
    this.generateNumber();
  }

  checkAnswer(): void {
    if (this.randomAnswer === parseInt(this.enteredAnswer, 10)) {
      this.points += 1;
      this.questions.answeredQuestions += 1;
      this.buttonValue = 'right';
    } else {
      if (this.vibration && this.service.settings.vibration) {
        this.vibration.vibrate([1000]);
      }
      this.buttonValue = 'wrong';

    }
    setTimeout(() => {
      this.resetData();
      this.generateNumber();
    }, 1500);

  }
  enteredNumbers(data): void {
    this.enteredAnswer = this.enteredAnswer.concat(data.target.textContent.trim());
  }

  generateNumber() {
    this.sequenceTypes = [
      {
        type: 'natural',
      },
      {
        type: 'sqrt',
      },
      {
        type: 'cube',
      },
      {
        type: '+2',
      },
      {
        type: 'square+1',
      },
    ];
    const test = Math.floor(Math.random() * this.sequenceTypes.length);
    const type = this.sequenceTypes[test].type;

    switch (type) {
      case 'natural':
        this.naturalNumber();
        break;
      case '+2':
        this.plus2();
        break;
      case 'sqrt':
        this.suareRootNumber();
        break;
      case 'cube':
        this.cubeNumbers();
        break;
      case 'square+1':
        this.squareplus1();
        break;
      default:
        this.naturalNumber();
        break;
    }
    this.questions.totalQuestions += 1;
  }
  naturalNumber() {
    const randomNumber = this.randomNum(10);
    this.question = [];
    for (let index = randomNumber; this.question.length <= 4; index++) {
      this.question.push(index);
    }
    this.questionGeneration();
  }
  plus2() {
    const randomNumber = this.randomNum(10);
    this.question = [];
    for (let index = randomNumber; this.question.length <= 4; index++) {
      this.question.push(index + 2);
    }
    this.questionGeneration();
  }

  suareRootNumber() {
    const randomNumber = this.randomNum(10);
    this.question = [];

    for (let index = randomNumber; this.question.length <= 4; index++) {
      this.question.push(Math.pow(index, 2));
    }
    this.questionGeneration();
  }
  cubeNumbers() {
    const randomNumber = this.randomNum(10);
    this.question = [];
    for (let index = randomNumber; this.question.length <= 4; index++) {
      this.question.push(Math.pow(index, 3));
    }
    this.questionGeneration();
  }
  squareplus1() {
    const randomNumber = this.randomNum(10);
    this.question = [];
    for (let index = randomNumber; this.question.length <= 4; index++) {
      this.question.push(Math.pow(index, 2) + 1);
    }
    this.questionGeneration();
  }
  public randomNum(baseValue): any {
    return Math.floor((Math.random() * baseValue) + 1);
  }
  questionGeneration(): void {
    while (true) {
      const index = Math.floor(Math.random() * (this.question.length - 1)) + 1;
      if (this.question[index] !== '_' && this.question[index] !== ' ' && this.question[index] !== '=') {
        this.randomAnswer = this.question[index];
        this.question[index] = '?';
        this.questions.totalQuestions += 1;
        break;
      }
    }
  }
  resetData(): void {
    this.enteredAnswer = '';
    this.buttonValue = '';
  }
  skip(): void {
    this.buttonValue = 'right';
    this.enteredAnswer = this.randomAnswer;
    setTimeout(() => {
      this.resetData();
      this.generateNumber();
    }, 1500);
  }

}
