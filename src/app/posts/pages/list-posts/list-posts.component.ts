import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import  * as PostsActions from '../../store/actions/posts.actions';
import { selectListPosts, selectLoading } from '../../store/selectors/posts.selectors';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  aux:string;
  posts$ = this.store.select(selectListPosts);
  loading$ = this.store.select(selectLoading);

  constructor( private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadPostss());

  }

}
