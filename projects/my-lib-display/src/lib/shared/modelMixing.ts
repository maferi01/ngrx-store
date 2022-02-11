import { AfterViewInit, OnInit, OnDestroy, Injector } from "@angular/core";

export interface IInit {
    init(...args: any[]): void;
  }
  export interface IBaseMIxings extends AfterViewInit, OnInit, OnDestroy, IInit {
    injector: Injector;
  }
  
  
 export  type Constructor<T = IBaseMIxings> = new (...args: any[]) => T;
  
