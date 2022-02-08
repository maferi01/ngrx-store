import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() label!:string;
  @Input() disabled=false;
  @Output() onClick= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
