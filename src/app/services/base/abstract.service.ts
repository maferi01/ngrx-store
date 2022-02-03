import { AbstractApp } from "src/app/shared/base/abstract-app";
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export abstract class AbstractService extends AbstractApp implements OnDestroy{

  //constructor(protected name: string) { super(name) } 

  ngOnDestroy(): void {
    this.console.debug('Destroy service')
  }

}
