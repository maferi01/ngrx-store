import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, delay } from 'rxjs/operators';
import { DataSelect, createData } from '../data';
import { Item } from '../select-field/select-field.component';

@Component({
  selector: 'app-complex2-field',
  templateUrl: './complex2-field.component.html',
  styleUrls: ['./complex2-field.component.scss']
})
export class Complex2FieldComponent implements OnInit {

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
  group!: FormGroup;

  subject= new BehaviorSubject<DataSelect[]>(createData());

  dataSelect$: Observable<Item[]>;

   controlAux=new FormControl();

      
    constructor(@Optional() private parentControl: ControlContainer, protected changeDet: ChangeDetectorRef, private formBuilder: FormBuilder) {
      this.group =this.formBuilder.group({}) ;
      this.dataSelect$= this.subject.pipe(
       // tap(values=> console.log('values',values)),
        map(data=> data.map( d => d as Item)),
        delay(1000)
      ) as Observable<Item[]>;
      
  }
  ngAfterViewInit(): void {
    
  }
  ngAfterContentInit(): void {
   
  }

  ngOnInit() {
    //console.log('parentcontrol', this.parentControl);
    this.parentFormGroup = this.parentControl?.control as FormGroup;
    this.addChildGroup();
    this.addTextSimple();
   
  }

  updateData(key:string){
    if(!key) return;
    this.subject.next(createData().filter(d=> d.desc.includes(key)))
  }

  
  addTextSimple(){
    this.group.addControl('mytext',this.controlAux);    
  }

  get validations(){
    return [Validators.required]
  }

  addChildGroup() {
    this.parentFormGroup.addControl(this.name, this.group);  
  }

}
