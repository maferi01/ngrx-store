import { AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, Injector, OnDestroy, OnInit, Output, QueryList, TemplateRef, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Constructor, FormComponent, FormField, IInit, IWithForm, IWithFormButtons } from "my-lib-display";
import { map, Subject, tap } from "rxjs";
import { consoleApp } from "src/app/services/utils/logger";
import { rxDestroy } from "src/app/services/utils/opersrx";
import { MyService } from "src/app/users/my.service";


  
export  interface ITest{
    test:()=>void
  }
  
  
  export function withDestroy<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements OnDestroy, IInit {
      destroy$ = new Subject();
      override init(...args: any[]): void {
        super.init(...args);
        const inj: Injector = this.injector;
        consoleApp(this).log('inject withDestoy=', inj, inj?.get(MyService))
      }
  
  
      override ngOnDestroy(): void {
        this.destroy$.next(true);
        super.ngOnDestroy();
      }
  
    };
  }





export function withForm<TBase extends Constructor>(Base: TBase) {
    @Directive()
    class Temporary extends Base implements AfterViewInit,IWithForm {
       
       formGroup!: FormGroup;
  
       @ViewChild(FormComponent) private  formComponent!:FormComponent;

      //private detect!: ChangeDetectorRef;
      subjectFields$= new Subject<FormField[]>();

      override init(...args: any[]) {
        super.init(...args);
        const inj: Injector = this.injector;
        //this.detect = inj.get(ChangeDetectorRef)
        
      }
      override ngAfterViewInit(): void {
       
        if(!this.formComponent)  throw new Error('Form Component is undefined');
        this.formGroup= this.formComponent.group;
        consoleApp(this).log('form controls', this.formComponent.fields.length, Object.keys(this.formComponent.group.controls).length) ;
        //(this.formComponent.group.controls['lastgroup'] as FormGroup)?.controls['text-group-last-2'].setValue('My val from comments')
        // this.formComponent.detect.detectChanges();
     
         this.formComponent.fields.changes.pipe(
           tap((val) => this.updateFields(val)),
           map((fields: QueryList<FormField>)=> fields.map(f=> f)), 
           rxDestroy(this as any,true)
         ) .subscribe(this.subjectFields$)           
        super.ngAfterViewInit();
      }
  
      updateFields(fields: QueryList<FormField>){
        fields.forEach(field=>{
          //consoleApp(this).log('field Comment Filter=',field.name,field.control,field);
          // if(field.name==='text-group-last-cent'){
          //   field.control.setValue('change from list comments  XXX')
          // }          
        })
      }      

    };
    return Temporary;
  }




  export function withFormButtons<TBase extends Constructor>(Base: TBase) {
    @Directive()
    class Temporary extends Base implements AfterViewInit,IWithFormButtons {
        
        @Output() onAccept= new EventEmitter();
        
        @ViewChild('buttons')
        templateButtons!: TemplateRef<any>;
      
    
      override init(...args: any[]) {
        super.init(...args);
        const inj: Injector = this.injector;
        //this.detect = inj.get(ChangeDetectorRef)
        
      }
      override ngAfterViewInit(): void {
        !this.templateButtons && consoleApp(this).warn('template buttons is undefined',this);           

        super.ngAfterViewInit();
      }
  
     

    };
    return Temporary;
  }
  
 
  