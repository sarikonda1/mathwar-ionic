import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-level-selector',
  templateUrl: './level-selector.component.html',
  styleUrls: ['./level-selector.component.scss'],
})
export class LevelSelectorComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSelectData: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {}
  onChange(event): void{
    this.onSelectData.emit(event.target.value);
  }
  onClickLevel(value): void{
    this.onSelectData.emit(value);
  }
}
