import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractDialogComponent } from 'my-lib-display';
import { withDestroy, withForm, withFormButtons } from 'src/app/shared/base/mixings-comp';

@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.scss']
})
export class FormCommentComponent  
extends
withFormButtons(
withForm( 
withDestroy(  
AbstractDialogComponent))) 
//implements OnInit
 {
  get validations():any[]{
    return [Validators.required]
  }
  
}
