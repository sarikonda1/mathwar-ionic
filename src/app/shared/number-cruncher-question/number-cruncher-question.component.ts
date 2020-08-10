import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { fadInAnimations } from 'src/app/animations';

@Component({
  selector: 'app-number-cruncher-question',
  templateUrl: './number-cruncher-question.component.html',
  styleUrls: ['../question/question.component.scss'],
  animations: fadInAnimations
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberCruncherQuestionComponent implements OnChanges {
  @Input() inputQuestion: any;
  @Input() showOperators: any;
  @Input() answerBoxClass: any;
  @Input() enteredAnswer: any = '';
  @Output() sendAnswer: EventEmitter<any> = new EventEmitter<any>();
  @Output() questionLoaded: EventEmitter<any> = new EventEmitter<any>();

  questionsData: any = [];
  tuttimer = [];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputQuestion && JSON.stringify(changes.inputQuestion.previousValue) !== JSON.stringify(changes.inputQuestion.currentValue)) {
      this.inputQuestion = [];
      this.clearTuttimer();
      Object.assign(this.inputQuestion, changes.inputQuestion.currentValue);
      // this.inputQuestion = changes.inputQuestion.currentValue;
      this.setInputQuestion();
    }
  }

  setInputQuestion(): void {
    this.questionsData = [];
    const that = this;
    this.inputQuestion.forEach((e, i) => {
      this.tuttimer.push(
        setTimeout(() => {
          if (e === '*') {
            that.questionsData.push('×');
          }
          else if (e === '/') {
            that.questionsData.push('÷');
          } else {
            that.questionsData.push(e);
          }
          if (that.inputQuestion.length === i + 1) {
            that.questionLoaded.emit(true);
          }
        }, (i < 3 ? i * 1 : ((i % 2 === 0 ? (i - 3) : (i - 2)) * 1000))));
    });
  }
  enteredNumber(numbers): void {
    if (!this.showOperators ){
      if (numbers === '-'){
        console.log(this.enteredAnswer);
        if (this.enteredAnswer){
          this.enteredAnswer = Math.abs(this.enteredAnswer);
        }
        this.enteredAnswer = '-' + this.enteredAnswer;
      }else if (numbers === '+'){
        console.log(this.enteredAnswer);
        this.enteredAnswer = this.enteredAnswer && this.enteredAnswer !== '-' ? Math.abs(this.enteredAnswer) : '';
      }else{
        this.enteredAnswer = this.enteredAnswer.toString().concat(numbers);
      }
    } else{
      this.enteredAnswer = numbers.toString();
    }
    this.sendAnswer.emit(this.enteredAnswer);
  }

  clearTuttimer() {
    for (let i = 0; i < this.tuttimer.length; i++) {
      clearTimeout(this.tuttimer[i]);
    }
  }
}

