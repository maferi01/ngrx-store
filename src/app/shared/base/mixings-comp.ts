import { AfterViewInit, ChangeDetectorRef, Directive, Injector, OnDestroy, OnInit, QueryList, ViewChild } from "@angular/core";
import { FormComponent, FormField } from "my-lib-display";
import { map, Subject, tap } from "rxjs";
import { consoleApp } from "src/app/services/utils/logger";
import { rxDestroy } from "src/app/services/utils/opersrx";
import { MyService } from "src/app/users/my.service";


export interface IInit {
    init(...args: any[]): void;
  }
  export interface IBaseMIxings extends AfterViewInit, OnInit, OnDestroy, IInit {
    injector: Injector;
  }
  
  
 export  type Constructor<T = IBaseMIxings> = new (...args: any[]) => T;
  
  
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
    class Temporary extends Base implements AfterViewInit {
  
      @ViewChild(FormComponent) formComponent!:FormComponent;

      detect!: ChangeDetectorRef;
      subjectFields$= new Subject<FormField[]>();

      override init(...args: any[]) {
        super.init(...args);
        const inj: Injector = this.injector;
        this.detect = inj.get(ChangeDetectorRef)
        
      }
      override ngAfterViewInit(): void {
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
  
  