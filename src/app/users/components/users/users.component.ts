import { AfterViewInit, ChangeDetectorRef, Component, Directive, Injectable, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from 'src/app/services/utils/base';
import { consoleApp, NameLog } from 'src/app/services/utils/logger';
import { MyService } from '../../my.service';
import { MixComponent } from '../mix/mix.component';


@Directive()
export class BaseComponent implements OnInit {

  @Input()
  dataBase='Hola'

  constructor(public  injector:Injector,public router:Router ) { 
    this.init(injector,router)
  }
  ngOnInit(): void {

  }
  init(...args:any[]){

  }
}



type Constructor<T = BaseComponent> = new (...args: any[]) => T;
function UserCompFields<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        name: string='my name ';
        email: string='my email'
        dataServicexx: any;
        constructor(...args: any[]){
          super(...args);
          consoleApp(this).log('args',args);
          //const inj:Injector=args.find(a=> a.constructor.name === 'NodeInjector')
          const inj:Injector=args[0];
          consoleApp(this).log('inject',inj, inj?.get(MyService))
          this.dataServicexx=inj?.get(MyService).getData();
        }
  
    };
}

function DataCompFields<TBase extends Constructor>(Base: TBase) {
  return class  extends Base {
      dataExtra: string='my data extra ';
      dataAux: string='my data Aux'
      dataService: any;

      constructor(...args: any[]){
        super(...args);
        consoleApp(this).log('args',args);
        args.forEach(a=> consoleApp(this).log('name 1', a.constructor.name))
        //args.forEach(a=> consoleApp(this).log('name 2',a.constructor.name, a.constructor.prototype,  a instanceof Injector))
        //args.forEach(a=> consoleApp(this).log('name 3', a.constructor, a instanceof Router))
        //const inj:Injector=args.find(a=> a.constructor.name === 'NodeInjector')
        consoleApp().log('inject arg[0]=',args[0])
        const inj:Injector=args[0];
        consoleApp(this).log('inject',inj, inj?.get(MyService))
        this.dataService=inj?.get(MyService).dataService;
      }
  };
}

export function InputFields<TBase extends Constructor>(Base: TBase) {
  @Directive()
  class Temporary extends Base implements OnInit{
    
    @Input()  
    dataInput: string='data Input';

    dataService: any;
    
    
    override init(...args: any[]){
       consoleApp(this).log('args ', args); 
       //const inj:Injector=args.find(a=> a.constructor.name === 'NodeInjector')
       const inj:Injector=args[0];
       consoleApp(this).log('inject',inj, inj?.get(MyService))
       this.dataService=inj?.get(MyService).dataService;
       super.init(...args)
    }
      // constructor(...args: any[]){
      //   super(...args);       
      // }
  };
  return Temporary;
}

export function InputExtraFields<TBase extends Constructor>(Base: TBase) {
  @Directive()
  class Temporary extends Base implements OnInit{
    
    @Input()  
    dataExtraInput: string='data Input';

    dataExtraService: any;
    
    
    override init(...args: any[]){
       consoleApp(this).log('args ', args); 
       const inj:Injector=this.injector;
       consoleApp(this).log('inject',inj, inj?.get(MyService))
       this.dataExtraService=inj?.get(MyService).dataService;
       super.init(...args);
    }
      // constructor(...args: any[]){
      //   super(...args);       
      // }
  };
  return Temporary;
}

export function MixView<TBase extends Constructor>(Base: TBase) {
  @Directive()
  class Temporary extends Base implements OnInit,AfterViewInit{
        
    @ViewChild(MixComponent)
    mixComponent!:MixComponent;
    dataChild: any;
    detect!: ChangeDetectorRef;
        
    override init(...args: any[]){
       //const inj:Injector=args[0];
       const inj:Injector=this.injector;
       this.detect=inj.get(ChangeDetectorRef)
       super.init(...args);
    }
    ngAfterViewInit(): void {
      consoleApp(this).log('MIx component', this.mixComponent);
      this.dataChild={extra:this.mixComponent.dataExtraService, data: this.mixComponent.dataService};
      this.detect.detectChanges();
      
    }
  };
  return Temporary;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
@NameLog('UsersComponent')
export class UsersComponent  extends MixView(DataCompFields(UserCompFields(BaseComponent))) implements OnInit {

  // constructor(){

  // }
  
  override ngOnInit(): void {
      consoleApp(this).log('router',this.router)
      consoleApp(this).log('router info',this.router.routerState) 
  }
}






