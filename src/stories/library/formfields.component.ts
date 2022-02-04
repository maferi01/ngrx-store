import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'storybook-button',
  template: ` 
  <app-form  #formfilter [showButtons]="true" (onAccept)="accept($event)">
    <ng-container [formGroup]="group" *formg="let group" >
      <div class="flex flex-row">
        <app-text-field [name]="'comment'" [label]="'Filter by comment'" [validations]="validations"  MatField>
        </app-text-field>
        <app-text-field [name]="'author'" [label]="'Filter by author'"  MatField>
        </app-text-field>
        <app-text-field [name]="'id'" [label]="'Filter by Id'" MatField>
        </app-text-field>
      </div>
    </ng-container>
  </app-form>
  `  
})
export default class FormFieldsComponent {
  /**
   * Optional click handler
   */
  @Output()
  onAccept = new EventEmitter();

  
  accept(data:any){
    console.log('passsssssssssss accept',data)
    this.onAccept.emit(data)
  }

  get validations():any[]{
    return [Validators.required]
  }
}
