import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main-service.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { fadInAnimations } from 'src/app/animations';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-advanced-practice',
  templateUrl: './advanced-practice.component.html',
  styleUrls: ['./advanced-practice.component.scss'],
  animations: fadInAnimations
})
export class AdvancedPracticeComponent implements OnInit {
  finalAnswer: any;
  enteredAnswer: any = '';
  operationsArray = ['+', '-', '*'];
  displayData = [];
  questions = {
    answeredQuestions: 0,
    totalQuestions: 0
  };
  maindata: any;
  level = 1;
  question = 1;
  operators: any = [];
  questionText = '';
  isCorrectAns = false;
  buttonValue = '';
  lastAnswer: number = 0;
  selectedLevel = '';
  deviceHeight: number;
  disableSkip: boolean;
  score: number = 0;
  constructor(public service: MainService, public vibration: Vibration, public platform: Platform) { }


  onClickNumbers(numbers): void {
    // this.enteredAnswer = this.enteredAnswer.concat(number);
    if (numbers === '-') {
      console.log(this.enteredAnswer);
      if (this.enteredAnswer) {
        this.enteredAnswer = Math.abs(this.enteredAnswer);
      }
      this.enteredAnswer = '-' + this.enteredAnswer;
    } else if (numbers === '+') {
      console.log(this.enteredAnswer);
      this.enteredAnswer = this.enteredAnswer && this.enteredAnswer !== '-' ? Math.abs(this.enteredAnswer) : '';
    } else {
      this.enteredAnswer = this.enteredAnswer.toString().concat(numbers);
    }
  }
  onSelect(level) {
    this.selectedLevel = level;
    this.generateQuestion();
  }
  resetData(fromApp = true): void {
    this.enteredAnswer = '';
    if (fromApp) {
      this.buttonValue = 'wrong';
      //  this.vibration.vibrate(500);
      setTimeout(() => {
        this.buttonValue = '';
      }, 500);
    }
  }
  skip(): void {
    this.disableSkip = true;
    this.enteredAnswer = +this.finalAnswer;
    this.buttonValue = 'skip';
    setTimeout(() => {
      this.buttonValue = '';
      this.lastAnswer = +this.finalAnswer;
      this.isCorrectAns = false;
      ++this.question;
      this.resetData(false);
      this.generateQuestion();
      this.service.clearTimer();
      this.service.startTimer();
    }, 500);
  }
  dataBasedOnLevel(level) {

  }
  ngOnInit() {
    this.score = 0;
    this.deviceHeight = this.platform.height() - 260;
    this.service.startTimer(180);
    this.operators = ['+', '-', '*', '/', '^'];
    this.level = 1;
    this.question = 1;

    this.maindata = {

      1: [{
        minNumber: 1,
        maxNumber: 50,
        operation: this.operators[0],
      },
      {
        minNumber: 1,
        maxNumber: 50,
        operation: this.operators[1],
        isSub: true
      },
      {
        minNumber: 1,
        maxNumber: 5,
        operation: this.operators[2],
        isMul: true,
        rules: [
          {
            ans: 10,
            mul: 5
          },
          {
            ans: 12,
            mul: 4
          },
          {
            ans: 20,
            mul: 3
          },
          {
            ans: 100,
            mul: 2
          },
          {
            ans: Infinity,
            mul: 1
          },
        ]
      }, {
        minNumber: 1,
        maxNumber: 5,
        operation: this.operators[4],
        expMinNumber: 2,
        expMaxNumber: 3,
        isExp: true
      },
        // {
        //   minNumber: 1,
        //   maxNumber: 100,
        //   operation: this.operators[3],
        //   isDvd: true
        // }
      ],
      2: [{
        minNumber: 50,
        maxNumber: 200,
        operation: this.operators[0],
      },
      {
        minNumber: 50,
        maxNumber: 199,
        operation: this.operators[1],
        isSub: true
      },
      {
        minNumber: 1,
        maxNumber: 10,
        operation: this.operators[2],
        isMul: true,
        rules: [
          {
            ans: 10,
            mul: 10
          },
          {
            ans: 25,
            mul: 4
          },
          {
            ans: 100,
            mul: 3
          },
          {
            ans: 1000,
            mul: 2
          },
          {
            ans: Infinity,
            mul: 1
          },
        ]
      }, {
        minNumber: 5,
        maxNumber: 15,
        operation: this.operators[4],
        expMinNumber: 2,
        expMaxNumber: 2,
        isExp: true
      },
        // {
        //   minNumber: 1,
        //   maxNumber: 100,
        //   operation: this.operators[3],
        //   isDvd: true
        // }
      ],
      3: [{
        minNumber: 200,
        maxNumber: 999,
        operation: this.operators[0],
      },
      {
        minNumber: 200,
        maxNumber: 999,
        operation: this.operators[1],
        isSub: true
      },
      {
        minNumber: 1,
        maxNumber: 10,
        operation: this.operators[2],
        isMul: true,
        rules: [
          {
            ans: 25,
            mul: 5
          },
          {
            ans: 50,
            mul: 4
          },
          {
            ans: 100,
            mul: 3
          },
          {
            ans: 1000,
            mul: 2
          },
          {
            ans: Infinity,
            mul: 1
          },
        ]
      }, {
        minNumber: 10,
        maxNumber: 25,
        operation: this.operators[4],
        expMinNumber: 2,
        expMaxNumber: 3,
        isExp: true
      },
        // {
        //   minNumber: 1,
        //   maxNumber: 100,
        //   operation: this.operators[3],
        //   isDvd: true
        // }
      ],
      4: [{
        minNumber: 500,
        maxNumber: 5000,
        operation: this.operators[0],
      },
      {
        minNumber: 500,
        maxNumber: 5000,
        operation: this.operators[1],
        isSub: true
      },
      {
        minNumber: 1,
        maxNumber: 10,
        operation: this.operators[2],
        isMul: true,
        rules: [
          {
            ans: 30,
            mul: 5
          },
          {
            ans: 100,
            mul: 4
          },
          {
            ans: 100,
            mul: 3
          },
          {
            ans: 3000,
            mul: 2
          },
          {
            ans: Infinity,
            mul: 1
          },
        ]
      }, {
        minNumber: 10,
        maxNumber: 25,
        operation: this.operators[4],
        expMinNumber: 2,
        expMaxNumber: 4,
        isExp: true
      },
        // {
        //   minNumber: 1,
        //   maxNumber: 100,
        //   operation: this.operators[3],
        //   isDvd: true
        // }
      ]
    };
    this.finalAnswer = 0;
  }
  generateQuestion(): void {
    console.log(this.selectedLevel);
    switch (this.selectedLevel) {
      case 'dynamic': if (this.question > 5) {
        this.level = 2;
      } else if (this.question > 10) {
        this.level = 3;
      }else if (this.question > 15){
        this.level = 4;
      }
      break;
      case 'easy': this.level = 1; break;
      case 'medium': this.level = 2; break;
      case 'hard': this.level = 3; break;
    }
    const levelBasedQuestions = this.maindata[this.level];
    this.questionText = '';
    for (let i = 0; i < (this.question === 1 ? 2 : this.question); i++) {
      setTimeout(() => {
        const index = this.getRandomInt(0, levelBasedQuestions.length - 1);
        const indQuestion = levelBasedQuestions[index];
        let number = 0;
        switch (true) {
          case indQuestion.isSub:
            if (!+this.finalAnswer) {
              indQuestion.operation = '+';
              number = this.getRandomInt(indQuestion.minNumber, indQuestion.maxNumber);
            } else {
              // tslint:disable-next-line: max-line-length
              number = this.getRandomInt(indQuestion.minNumber > +this.finalAnswer ? 0 : indQuestion.minNumber, +this.finalAnswer);
            }
            break;
          case indQuestion.isExp:
            number = this.getRandomInt(indQuestion.minNumber, indQuestion.maxNumber);
            const expNumber = this.getRandomInt(indQuestion.expMinNumber, indQuestion.expMaxNumber);
            this.finalAnswer += Math.pow(number, expNumber);
            if (!i) {
              if (this.question > 1) {
                this.questionText += `+ ${number}<sup>${expNumber}</sup>`;
              } else {
                this.questionText += `${number}<sup>${expNumber}</sup>`;
              }
            } else {
              this.questionText += ` + ${number}<sup>${expNumber}</sup>`;
            }
            break;
          case indQuestion.isMul: number = this.multiplication(indQuestion, this.finalAnswer); break;
          default: number = this.getRandomInt(indQuestion.minNumber, indQuestion.maxNumber); break;
        }

        if (!indQuestion.isExp) {
          if (i !== 0 || this.question > 1) {
            this.finalAnswer = eval(this.finalAnswer + ' ' + indQuestion.operation + ' ' + number);
          } else {
            this.finalAnswer += number;
          }

          if (!i) {
            if (this.question > 1) {
              this.questionText += indQuestion.operation + ' ' + number;
            } else {
              this.questionText += number;
            }
          } else {
            this.questionText += ' ' + indQuestion.operation + ' ' + number;
          }
        }
        this.displayData = this.questionText.split(' ');
        if (i === (this.question === 1 ? 1 : this.question - 1)){
          this.disableSkip = false;
        }
      }, i * (this.question === 1 ? 1 : 2000));
    }
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  multiplication(que, lastAns): number {
    return this.getRandomInt(1, que.rules.find(e => e.ans > lastAns).mul);
  }
  checkAnswer(): void {
    if (this.finalAnswer === +this.enteredAnswer) {
      this.buttonValue = 'right';
      this.isCorrectAns = true;
      this.service.onCorrectAnswer();
      this.score += 10;
      setTimeout(() => {
        this.disableSkip = true;
        this.isCorrectAns = false;
        ++this.question;
        this.resetData(false);
        this.generateQuestion();
        this.service.clearTimer();
        this.service.startTimer();
        this.lastAnswer = +this.finalAnswer;
      }, 500);
    } else {
      this.service.onWrongAnswer();
      this.buttonValue = 'wrong';
      this.enteredAnswer = '';
      if (this.vibration && this.service.settings.vibration) {
        this.vibration.vibrate(500);
      }
    }
    setTimeout(() => {
      this.buttonValue = '';
    }, 600);
  }
  onAction(action): void {
    switch (action.operation) {
      case 'skip': this.skip(); break;
      case 'clear': this.resetData(); break;
      case 'submit': this.checkAnswer(); break;
    }
  }
}