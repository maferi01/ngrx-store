import { Observable } from 'rxjs';
import { delay, filter, finalize, map, tap } from 'rxjs/operators';
import { IConsole } from './logger';

export function dev(mes: any, ...pars:any[]) {
  // intercept msgs for trace
}

// extra operators helper RX

export function rxlog<T>(this: any, str:string, ...vars: any[]): (obsSrc: Observable<T>) => Observable<T> {
  const console2: IConsole=this?.console||console
  return (obsSrc: Observable<any>) => {
    return obsSrc.pipe(tap((v) =>  console2.log(str, ...vars, v)));
  };
}

export function rxwarn<T>(this: any, str:string, ...vars: any[]): (obsSrc: Observable<T>) => Observable<T>  {
  const console2: IConsole=this?.console||console
  return (obsSrc: Observable<any>) => {
    return obsSrc.pipe(tap((v) => console2.warn(str,...vars, v)));
  };
}

export function rxinfo<T>(this: any, str:string, ...vars: any[]): (obsSrc: Observable<T>) => Observable<T>  {
  const console2: IConsole=this?.console||console
  return (obsSrc: Observable<any>) => {
    return obsSrc.pipe(tap((v) => console2.info(str, ...vars, v)));
  };
}

export function rxDelay(time: number): (obsSrc: Observable<any>) => Observable<any> {
  return (obsSrc: Observable<any>) => {
    return obsSrc.pipe(rxwarn('Delay active',null,time), delay(time));
  };
}


export function rxend<T>(this: any, str:string, enable = true): (obsSrc: Observable<T>) => Observable<T> {
  const console2: IConsole=(this as any)?.console||console
  return (obsSrc: Observable<any>) => {
    return obsSrc.pipe(finalize(() => (enable ? console2.info(str) : 0)));
  };
}

export function rxErrorRest(enable = true): (obsSrc: Observable<any>) => Observable<any> {
  return (obsSrc: Observable<any>) => {
    return obsSrc.pipe(
      map((resp) => {
        if (resp.type && resp.type === 'error') {
          throw { error: resp };
        } else {
          return resp;
        }
      })
    );
  };
}

export function rxFilterNE(enable = true): (obsSrc: Observable<any>) => Observable<any> {
  return (obsSrc: Observable<any>) => {
    return obsSrc.pipe(filter((v) => v != null && v !== ''));
  };
}

  
// }