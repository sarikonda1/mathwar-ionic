import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadInAnimations } from 'src/app/animations';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: fadInAnimations
})
export class QuestionComponent implements OnInit {
  @Input() inputQuestion: any;
  @Input() showOperators: any;
  @Input() answerBoxClass: any;
  @Input() enteredAnswer: any = '';
  @Input() operatorClass = true;
  @Output() sendAnswer: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
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
}
