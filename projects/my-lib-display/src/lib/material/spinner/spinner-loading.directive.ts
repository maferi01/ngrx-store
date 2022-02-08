import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { SpinnerComponent } from './spinner.module';

@Directive({
  selector: '[libLoading]'
})
export class SpinnerLoadingDirective implements OnChanges {

  @Input()
  libLoading!:boolean | undefined |null;

  constructor(private viewContainer:ViewContainerRef,private templateRef:TemplateRef<any>) {

   }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['libLoading']){
        this.updateLoading(this.libLoading);
    }
  }

   updateLoading(loading:boolean|undefined|null){
      this.viewContainer.clear(); 
      if(loading){
         this.viewContainer.createComponent(SpinnerComponent);
      }else{
         this.viewContainer.createEmbeddedView(this.templateRef); 
      }
   }

}
