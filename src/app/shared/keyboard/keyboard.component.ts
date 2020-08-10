import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadInAnimations } from 'src/app/animations';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  animations: fadInAnimations
})
export class KeyboardComponent implements OnInit {
   @Input() showOperators: any;
   @Input() ShowKeyBoard: any;
   @Input() enteredAnswer: any;
   // tslint:disable-next-line: no-output-on-prefix
   @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}
  enteredNumber(event): void{
    console.log(event);
    this.onClick.emit(event);
  }
  getIcon(): any{
    return this.enteredAnswer ? (this.enteredAnswer >= 0 ? '-' : '+') : '-';
  }
}
