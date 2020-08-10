import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.scss'],
})

export class ValidatorsComponent implements OnChanges {

  @Input() validationControl: AbstractControl;
  @Input() doValidate: boolean;
  @Input() labelName: string;
  message: string;

  constructor() { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges) {
  }

  get showMessage(): any {
    if (this.doValidate && this.validationControl !== undefined && this.validationControl && this.validationControl.errors) {

      this.message = '';
      // tslint:disable-next-line:forin
      for (const key in this.validationControl.errors) {
        switch (key) {
          case 'required':
            // this.requiredMessage(this.labelName);
            this.message = this.labelName + ' is required';
            break;
          case 'email':
            this.message = this.labelName + ' not valid';

            break;
          case 'pattern':
            this.message = this.labelName + ' is Invalid';
            break;
          case 'minlength':
            this.message = this.labelName + ' should not contain less than ' + this.validationControl.errors[key].requiredLength + ' characters'; break;
          case 'maxlength':
            this.message = this.labelName + ' should not contain greater than ' + this.validationControl.errors[key].requiredLength + ' characters';
            break;
        }
      }
      return true;
    }
    return false;
  }
}