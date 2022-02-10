import { AfterViewInit, ChangeDetectorRef, Component, Directive, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subject, takeUntil } from 'rxjs';
import { consoleApp, NameLog } from 'src/app/services/utils/logger';
import { rxDestroy, rxlogth } from 'src/app/services/utils/opersrx';
import { MyService } from '../../my.service';
import { MixComponent } from '../mix/mix.component';


@Directive()
export class BaseComponent implements IBaseMIxings {

  @Input()
  dataBase = 'Hola'

  constructor(public injector: Injector, public router: Router) {
    this.init(injector, router)
  }
  ngOnDestroy(): void {

  }
  init(...args: any[]): void {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {

  }
}


export interface IInit {
  init(...args: any[]): void;
}
export interface IBaseMIxings extends AfterViewInit, OnInit, OnDestroy, IInit {
  injector: Injector;
}


type Constructor<T = IBaseMIxings> = new (...args: any[]) => T;


interface ITest{
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

function UserCompFields<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements ITest{
    name: string = 'my name ';
    email: string = 'my email'
    dataServicexx: any;
    constructor(...args: any[]) {
      super(...args);
      const inj: Injector = this.injector;
      consoleApp(this).log('inject UserCompFields=', inj, inj?.get(MyService))
      this.dataServicexx = inj?.get(MyService).getData();
    }
    test!: () => void;

  };
}

// join interfaces IBaseMIxings and ITest if we want specific, we must avoid this way. Couple between mixins
function DataCompFields<TBase extends Constructor<IBaseMIxings & ITest>>(Base: TBase) {
  return class extends Base {
    dataExtra: string = 'my data extra ';
    dataAux: string = 'my data Aux'
    dataService: any;

    constructor(...args: any[]) {
      super(...args);
      //args.forEach(a=> consoleApp(this).log('name 1', a.constructor.name))
      //const inj:Injector=args.find(a=> a.constructor.name === 'NodeInjector')
      const inj: Injector = this.injector;
      consoleApp(this).log('injector DataCompFields=', inj, inj?.get(MyService))
      this.dataService = inj?.get(MyService).dataService;
      if(this.test) this.test(); // check test, depends on other mixing

    }
  };
}

export function InputFields<TBase extends Constructor>(Base: TBase) {
  @Directive()
  class Temporary extends Base implements OnInit {

    @Input()
    dataInput: string = 'data Input';

    dataService: any;


    override init(...args: any[]) {
      super.init(...args)
      const inj: Injector = this.injector;
      consoleApp(this).log('inject InputFields=', inj, inj?.get(MyService))
      this.dataService = inj?.get(MyService).dataService;
      
      
    }

    override ngOnInit(): void {
      this.testObs().subscribe();
      super.ngOnInit()
    }

    testObs() {
      return interval(2000).pipe(
        rxlogth(this)('Interval'),
        rxDestroy(this as any)
      )
    }

  };
  return Temporary;
}

export function InputExtraFields<TBase extends Constructor>(Base: TBase) {
  @Directive()
  class Temporary extends Base {

    @Input()
    dataExtraInput: string = 'data Input';

    dataExtraService: any;


    override init(...args: any[]) {
      super.init(...args);
      const inj: Injector = this.injector;
      consoleApp(this).log('inject InputExtraFields', inj, inj?.get(MyService))
      this.dataExtraService = inj?.get(MyService).dataService;
      
    }

  };
  return Temporary;
}

export function MixView<TBase extends Constructor>(Base: TBase) {
  @Directive()
  class Temporary extends Base implements AfterViewInit {

    @ViewChild(MixComponent)
    mixComponent!: MixComponent;
    dataChild: any;
    detect!: ChangeDetectorRef;

    override init(...args: any[]) {
      super.init(...args);
      const inj: Injector = this.injector;
      this.detect = inj.get(ChangeDetectorRef)
      
    }
    override ngAfterViewInit(): void {
      consoleApp(this).log('MIx component', this.mixComponent);
      this.dataChild = { extra: this.mixComponent.dataExtraService, data: this.mixComponent.dataService };
      this.detect.detectChanges();
      super.ngAfterViewInit();

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
export class UsersComponent extends MixView(DataCompFields(UserCompFields(withDestroy(BaseComponent)))) implements OnInit {

  // constructor(){

  // }

  override ngOnInit(): void {
    consoleApp(this).log('router state', this.router?.routerState)
    super.ngOnInit()

  }
}






