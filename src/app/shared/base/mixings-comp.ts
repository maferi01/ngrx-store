import { AfterViewInit, OnInit, OnDestroy, Injector } from "@angular/core";
import { Subject } from "rxjs";
import { consoleApp } from "src/app/services/utils/logger";
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
  