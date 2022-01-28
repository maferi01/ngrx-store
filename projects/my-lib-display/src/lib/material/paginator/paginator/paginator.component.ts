import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

export type TypeEventPagination='first' | 'last' | 'prev' | 'next';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit,OnDestroy {
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();
  @Output() first = new EventEmitter();
  @Output() last = new EventEmitter();

  @Input() enableNext = true;
  @Input() enableFirst = true;
  @Input() enableLast = true;
  @Input() enablePrev = true;

  @Output() typeEvent = new EventEmitter<TypeEventPagination>();

  onDestroy= new Subject();
  
  constructor() {}

  ngOnInit(): void {
    this.typeEvent.pipe(
      tap(type=> {
        switch(type){
          case 'first':
            this.first.emit();
            break;
          case 'last':
            this.last.emit();
            break;
          case 'next':
            this.next.emit();
            break;
          case 'prev':       
          this.prev.emit();
          break;
        }
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
   this.onDestroy.next(true);
  }

}
