import { Subject } from "rxjs";
import { Observable, defer } from "rxjs";
import { finalize } from "rxjs/operators";

export function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
      callback();
      return source;
    });
  }


  export function indicate<T>(indicator: Subject<{status:boolean,key:string}>): (source: Observable<T>) => Observable<T> {
    const key = Math.random().toString(32);
    return (source: Observable<T>): Observable<T> => source.pipe(
      prepare(() => indicator.next({status:true,key:key})),
      finalize(() => indicator.next({status:false,key:key}))
    )
  }