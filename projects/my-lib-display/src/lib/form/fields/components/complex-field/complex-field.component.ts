import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { DataSelect, createData } from '../data';
import { GroupFieldComponent } from '../group-field/group-field.component';
import { Item } from '../select-field/select-field.component';



@Component({
  selector: 'app-complex-field',
  templateUrl: './complex-field.component.html',
  styleUrls: ['./complex-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplexFieldComponent implements OnInit,AfterContentInit,AfterViewInit {
  @Input()
  name!: string;
  @Input()
  value!: any;
  @Output()
  onChange = new EventEmitter();

  @Input()
  label!: string;

  @Input()
  parentFormGroup!: FormGroup;

  subject= new BehaviorSubject<DataSelect[]>(createData());

  dataSelect$: Observable<Item[]>;

   controlAux=new FormControl();

   @ViewChild(GroupFieldComponent)
   groupComp!:GroupFieldComponent;
   
    constructor(@Optional() private parentControl: ControlContainer, protected changeDet: ChangeDetectorRef) {
      this.dataSelect$= this.subject.pipe(
      //  tap(values=> console.log('values',values)),
        map(data=> data.map( d => d as Item)),
        delay(1000)
      ) as Observable<Item[]>;
      
  }
  ngAfterViewInit(): void {
    this.addTextSimple()
  }
  ngAfterContentInit(): void {
   
  }

  ngOnInit() {
    //console.log('parentcontrol', this.parentControl);
    this.parentFormGroup = this.parentControl?.control as FormGroup;
   
   
  }

  updateData(key:string){
    if(!key) return;
    this.subject.next(createData().filter(d=> d.desc.includes(key)))
  }

  
  addTextSimple(){
    this.groupComp.group.addControl('mytext',this.controlAux);
    //this.changeDet.markForCheck();
  }

  get validations(){
    return [Validators.required]
  }
}
