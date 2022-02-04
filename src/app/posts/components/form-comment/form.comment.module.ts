import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule, DialogModule, FormModule, MaterialFieldsModule } from "my-lib-display";
import { FormCommentComponent } from "./form-comment.component";

@NgModule({
    declarations: [
      FormCommentComponent
    ],
    imports: [
      CommonModule,
      FormModule,
      MaterialFieldsModule,      
      ButtonModule
    ],
    exports:[
        FormCommentComponent
    ]
  })
  export class FormCommentModule { }
  