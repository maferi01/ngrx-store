import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectError, selectErrorState } from '../store/selectors/error.selectors';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss']
})
export class PageErrorComponent implements OnInit {

  error$= this.store.select(selectError);

  constructor(private store:Store) { }

  ngOnInit(): void {
  }

}
