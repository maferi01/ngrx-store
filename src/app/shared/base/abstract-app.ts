import { Injector, Optional } from "@angular/core";
import { Observable } from "rxjs";
import { getLogger, IConsole } from "src/app/services/utils/logger";
import { rxlog, rxwarn } from "src/app/services/utils/opersrx";
import { rxinfo, rxend } from '../../services/utils/opersrx';
import { NamesLog } from '../../services/utils/names-classes';     

export abstract class AbstractApp {
    console: IConsole;
    rxlog:<T>(...vars:any[])=>(obsSrc: Observable<T>) => Observable<T>=rxlog.bind(this); 
    rxinfo:<T>(...vars:any[])=>(obsSrc: Observable<T>) => Observable<T>=rxinfo.bind(this); 
    rxwarn:<T>(...vars:any[])=>(obsSrc: Observable<T>) => Observable<T>=rxwarn.bind(this); 
    rxend:<T>(str:string)=>(obsSrc: Observable<T>) => Observable<T>=rxend.bind(this);

    nameLog:NamesLog;

    constructor(@Optional()  protected injector?: Injector,@Optional()  protected nameLogNew?: string){
        //console.debug('nameLog',(this as any).nameLog,(this as any)?.prototype?.nameLog);
        if(nameLogNew){
            this.nameLog=nameLogNew as unknown as NamesLog;
        }
        this.console = getLogger(this.nameLog);
        
       
        
    }
}
