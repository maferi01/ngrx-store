import { Observable } from 'rxjs';
import { delay, filter, finalize, map, tap } from 'rxjs/operators';
import { consoleApp } from './logger';
import { rxlog } from './opersrx';


// extra operators helper RX

export function rxZod<T>(schemaZod:{parse:(data:any)=>void,safeParse:(data:any)=>any},typeValidation:'error'|'warning' ='warning'): (obsSrc: Observable<T>) => Observable<T> {
  return (obsSrc: Observable<any>) => {
    return obsSrc.pipe(
      rxlog('data zod'),
      map((data) => {
      //  schemaZod.parse(data);
      const res=schemaZod.safeParse(data);
      if(!res.success){
        if(typeValidation==='warning'){
          consoleApp('rxzod validation').warn('Pasing error with', data, JSON.stringify(res))
        }else{
          consoleApp('rxzod validation').error('Pasing error with', data, JSON.stringify(res))
          throw new Error(`Pasing error with: ${JSON.stringify(data)} ${JSON.stringify(res)}`);
        }      
          
      }      
      return data;
    }));
  };
}

