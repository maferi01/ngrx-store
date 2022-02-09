import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Item } from 'my-lib-display';
import { BehaviorSubject, Observable, tap, map, delay } from 'rxjs';
import { ValidatorsApp } from 'src/app/demo-lib/validatosapp';


export interface DataSelect{
  key: string;
  value:string,
  desc: string;
}


export function createData():DataSelect[]{
  return [
    {key: '1', value: '11', desc:'desc data 11' },
    {key: '1', value: '12', desc:'desc data 12' },
    {key: '1', value: '13', desc:'desc data 13' },
    {key: '2', value: '21', desc:'desc data 21' },
    {key: '2', value: '22', desc:'desc data 22' },
    {key: '2', value: '23', desc:'desc data 23' },
    {key: '3', value: '31', desc:'desc data 31' },
    {key: '3', value: '32', desc:'desc data 32' },
    {key: '3', value: '33', desc:'desc data 33' },
    
  ];
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'form-normal',
  template: ` 
  <app-form  #formfilter [showButtons]="true" (onAccept)="accept($event)">
    <ng-container [formGroup]="group" *formg="let group" >
      <div class="flex flex-row">
      <app-number-field [name]="'number field'" [label]="'Number field'" [value]="10" class="w-6"></app-number-field>
      <app-number-field [name]="'number field_other'" [label]="'Number field'" [value]="50" class="w-6"></app-number-field>
       <app-text-field [name]="'text-group-other'" [label]="'text test other'" class="w-6"></app-text-field>
       <app-email-field [name]="'email'" [label]="'Email *'"></app-email-field>
            
      </div>
    </ng-container>
  </app-form>
  `  
})
export default class FormFieldsNormalComponent {
  title = 'app-dialog';
  valueForm:any;
  valueSelect: any;
  valueSelectComplex: any;
  subject= new BehaviorSubject<DataSelect[]>(createData());
  subjectList= new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);


  dataSelect$!: Observable<Item[]>;
  dataList$= this.subjectList.asObservable();
  val:string='val1';

  @Output()
  onAccept = new EventEmitter();

    constructor(private detect:ChangeDetectorRef){
   
         
    }
 
  
    
   accept(data:any){
      console.log('passsssssssssss accept',data)
      this.onAccept.emit(data)
    }


  updateData(key:string){
    if(!key) return;
    this.subject.next(createData().filter(d=> d.key===key))
  }
  
  get validations(){
    return [Validators.required]
  }

  validationsGroup(f1:string,f2:string){
    return [ValidatorsApp.compareFields(f1,f2)]
  }
  validationsInGroup(f1:string,f2:string,f3:string){
    return [ValidatorsApp.compareFieldsGroup(f1,f2),ValidatorsApp.compareFieldsGroupb(f1,f3)]
  }

  validationsInOtherGroup(f1:string,f2:string,f1g:string|null,f2g:string|null){
    return [ValidatorsApp.compareFieldsOtherGroup(f1,f2,f1g,f2g)]
  }

  get dataTable(){
    return ELEMENT_DATA;
  }

  sortData(sort:Sort){
    this.subjectList.next([...sortList(ELEMENT_DATA,sort.active,sort.direction)]) ;
    
  }

  filterList(filter:{name:string,position:number}){
    this.subjectList.next([...ELEMENT_DATA.filter(e=> e.position===filter.position && e.name.includes(filter.name))]) ;
    
  }

}


function sortList(list:any[],key:string,asc:'asc' | 'desc' | ''){
  return list.sort((a,b)=> {
    if(a[key]===b[key]) return 0;
    if(asc==='asc'){
     return (a[key]> b[key])?1:-1;
    }else{
     return (a[key]> b[key])?-1:1;
    }
  });
}
