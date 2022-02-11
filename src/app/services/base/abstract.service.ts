import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export abstract class AbstractService implements OnDestroy{

  //constructor(protected name: string) { super(name) } 

  ngOnDestroy(): void {
    console.debug('Destroy service')
  }

}
