import { Level, Log, Logger } from 'ng2-logger/browser';

export let mapNames: Map<string, number> = new Map();
export let mapNamesLevels: Map<string, Level[]> = new Map();

const nameLogPrototype='nameLog';


/**
 * 
 * Log App and consoleApp  
 */

 export interface IConsole {
  log(msg: string, ...params:any[]):void;
  debug(msg: string, ...params:any[]):void;
  error(msg: string, ...params:any[]):void;
  info(msg: string, ...params:any[]):void;
  warn(msg: string, ...params:any[]):void;
}


export function logApp(typeLog:'data'| 'info' | 'warn' | 'error' ,msg: string,params:any[],source?:any){
  
  let nameLogger;

//console.log('source protype',source?.constructor,source?.constructor.);

  if(typeof source ==='string'){
    // from string drecttly
    nameLogger=source;
  }else if(source?.constructor?.prototype && source?.constructor?.prototype[nameLogPrototype]){
    // from prototype class and from decorator
    nameLogger= source?.constructor?.prototype[nameLogPrototype]
  }else{ 
    // from name class , but in uglifi not work good
    nameLogger=source?.constructor?.name;
  }

  const l= Log.create(nameLogger);

  params?.length>0?((l as any)[typeLog])(msg,...params):((l as any)[typeLog])(msg);
}


export const consoleAppx:IConsole={
 log:(msg: string,...params:any[])=>  logApp('data',msg,params),
 debug:(msg: string,...params:any[])=>  logApp('info',msg,params),
 warn:(msg: string,...params:any[])=>  logApp('warn',msg,params),
 info:(msg: string,...params:any[])=>  logApp('info',msg,params),
 error:(msg: string,...params:any[])=>  logApp('error',msg,params)
}; 

export function consoleApp(source?:any): IConsole{
 // return console;
  return {
    log:(msg: string,...params:any[])=>  logApp('data',msg,params,source),
    debug:(msg: string,...params:any[])=>  logApp('info',msg,params,source),
    warn:(msg: string,...params:any[])=>  logApp('warn',msg,params,source),
    info:(msg: string,...params:any[])=>  logApp('info',msg,params,source),
    error:(msg: string,...params:any[])=>  {
      //logApp('error',msg,params,source)
      console.error(msg, params);
    }
   }
}


export function NameLog(nameLog:string) {
  return function(constructor: any) {
   // console.log('namelog')
      //const orig = constructor.prototype.ngOnDestroy
     // constructor.nameLog=nameLog;
       if(constructor.prototype)constructor.prototype[nameLogPrototype]=nameLog;
      // if(constructor.prototype){
      //   constructor.prototype.testFn=function(this:any){consoleApp('TESTFN').log('data name log',this[nameLogPrototype],this.httpClient,this.injector)}
      // }
      // constructor.prototype.ngOnDestroy = function() {
      //     for(const prop in this) {
      //         const property = this[prop]
      //         if(typeof property.unsubscribe === "function" && !obs$.includes(property))
      //             obs$.push(property)
      //     }
      //     for(const ob$ of obs$) {
      //           ob$.unsubscribe()
      //     }
      //     orig.apply()
      // }
  }
}


/**
 *   End consoleApp
 */




export function getLogger(name: string): IConsole {
  return new ConsoleApp(name);
}

export function updateLevelLog() {
 // if (environment.production) {
    //  Log.setProductionMode();
    //Log.onlyLevel(Level.ERROR, Level.INFO, Level.WARN);
        
 // }
}

export declare type NameLevels={
  name:string;
  levels:Level[];
};
export function setNamesLevels(names:NameLevels[]){
   names?.forEach(n=> mapNamesLevels.set(n.name,n.levels));  
}
export function getNameLevels(name:string):Level[]|undefined{
  return mapNamesLevels.get(Array.from(mapNamesLevels!.keys()).find(k=> name.startsWith(k)) as any);
  
}
export function refreshNamesLevels(){
  if(localStorage.getItem('namesLevels')){
    setNamesLevels(JSON.parse(localStorage.getItem('namesLevels') as any))
  }
}
export function getNameLog(name: string): string {
  if (mapNames.get(name) !== undefined) {
    let id = mapNames.get(name) as any;
    mapNames.set(name, ++id );
  } else {
    mapNames.set(name, 0);
  }
  return `${name}_${mapNames.get(name)}`;
}

export class ConsoleApp implements IConsole{
  logN2: Logger;

  constructor(name?: string) {
    let nameLog: string;
    if (name) {
      nameLog = getNameLog(name);
    } else {
      nameLog = getNameLog(this.constructor.name);
    }

    if(getNameLevels(nameLog)){
      this.logN2 = Log.create(nameLog,...getNameLevels(nameLog) as any);  
    }else{
      this.logN2 = Log.create(nameLog);
    }
  }

  log(msg: string, ...params: any[]) {
    this.logN2.d(msg, ...params);
  }
  debug(msg: string, ...params: any[]) {
    this.logN2.d(msg, ...params);
  }
  error(msg: string, ...params: any[]) {
    this.logN2.error(msg, ...params);
  }
  info(msg: string, ...params: any[]) {
    this.logN2.i(msg, ...params);
  }
  warn(msg: string, ...params: any[]) {
    this.logN2.w(msg, ...params);
  }

}





