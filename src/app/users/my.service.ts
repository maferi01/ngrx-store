import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  dataService:any;

  constructor() { 
    this.dataService={
      data:'data from Service'
    }
  }

  getData(){
    return {
        data:'data from Service XXXXXX'
      }
    
  }
}
