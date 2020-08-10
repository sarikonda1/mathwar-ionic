import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() isQuestionLoaded: boolean;
  @Input() disableSkip: boolean;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}
  onClickFooter(action): void{
     this.action.emit({operation: action});
  }
}
