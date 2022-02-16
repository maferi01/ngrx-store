import { AfterViewInit, ChangeDetectorRef, Component, Directive, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, Constructor, IBaseMIxings } from 'my-lib-display';
import { interval } from 'rxjs';
import { ITest, withDestroy } from 'src/app/shared/base/mixings-comp';
import { NameLog } from 'src/app/shared/services/utils/logger';
import { rxlogth, rxDestroy } from 'src/app/shared/services/utils/opersrx';
import { MyService } from '../../my.service';
import { MixComponent } from '../mix/mix.component';





function UserCompFields<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements ITest{
    name: string = 'my name ';
    email: string = 'my email'
    dataServicexx: any;
    constructor(...args: any[]) {
      super(...args);
      const inj: Injector = this.injector;
      //consoleApp(this).log('inject UserCompFields=', inj, inj?.get(MyService))
      this.dataServicexx = inj?.get(MyService).getData();
    }
    test!: () => void;

  };
}

// join interfaces IBaseMIxings and ITest if we want specific, we must avoid this way. Couple between mixins
function DataCompFields<TBase extends Constructor<IBaseMIxings>>(Base: TBase) {
  return class extends Base {
    dataExtra: string = 'my data extra ';
    dataAux: string = 'my data Aux'
    dataService: any;

    constructor(...args: any[]) {
      super(...args);
      //args.forEach(a=> consoleApp(this).log('name 1', a.constructor.name))
      //const inj:Injector=args.find(a=> a.constructor.name === 'NodeInjector')
      const inj: Injector = this.injector;
      //consoleApp(this).log('injector DataCompFields=', inj, inj?.get(MyService))
      this.dataService = inj?.get(MyService).dataService;
      // check if test exits. then we call it 
      if((this as any).test) (<any>this).test(); // check test, depends on other mixing

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
      //consoleApp(this).log('inject InputFields=', inj, inj?.get(MyService))
      this.dataService = inj?.get(MyService).dataService;
      
      
    }

    override ngOnInit(): void {
      //this.testObs().subscribe();
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
      //consoleApp(this).log('inject InputExtraFields', inj, inj?.get(MyService))
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
      //consoleApp(this).log('MIx component', this.mixComponent);
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
export class UsersComponent extends UserCompFields(MixView(DataCompFields(withDestroy(BaseComponent)))) implements OnInit {

  // constructor(){

  // }

  override ngOnInit(): void {
    //consoleApp(this).log('router state', this.router?.routerState)
    super.ngOnInit()

  }
}






