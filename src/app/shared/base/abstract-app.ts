import { Directive, Injector, Input, Optional } from "@angular/core";
import { getLogger, IConsole } from "src/app/services/utils/logger";
import { NamesLog } from '../../services/utils/names-classes';
import { IBaseMIxings } from "./mixings-comp";


@Directive()
export  class BaseComponent implements IBaseMIxings {

  @Input()
  dataBase = 'Hola'

  constructor(public injector: Injector) {
    this.init(injector)
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




export abstract class AbstractApp {
    console: IConsole;
    // rxlog:<T>(...vars:any[])=>(obsSrc: Observable<T>) => Observable<T>=rxlog.bind(this); 
    // rxinfo:<T>(...vars:any[])=>(obsSrc: Observable<T>) => Observable<T>=rxinfo.bind(this); 
    // rxwarn:<T>(...vars:any[])=>(obsSrc: Observable<T>) => Observable<T>=rxwarn.bind(this); 
    // rxend:<T>(str:string)=>(obsSrc: Observable<T>) => Observable<T>=rxend.bind(this);

    nameLog!:NamesLog;

    constructor(@Optional()  protected injector?: Injector,@Optional()  protected nameLogNew?: string){
        //console.debug('nameLog',(this as any).nameLog,(this as any)?.prototype?.nameLog);
        if(nameLogNew){
            this.nameLog=nameLogNew as unknown as NamesLog;
        }
        this.console = getLogger(this.nameLog);
        
       
        
    }
}
