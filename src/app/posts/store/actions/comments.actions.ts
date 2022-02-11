import { createAction, props } from '@ngrx/store';
import { TypeEventPagination } from 'my-lib-display';
import { LoadInfo, LoadInfoSuccces, SortInfo } from 'src/app/services/models/filter.model';
import { Comment, FilterComment } from '../../models/comment';


/**
 * Actions for list
 */

export const loadInitComments = createAction(
  '[Comments] Load Init Comments'
);

export const loadCommentssSuccess = createAction(
  '[Comments] Load Commentss Success',
  props<LoadInfoSuccces<FilterComment,Comment>>()
);

export const loadCommentssFailure = createAction(
  '[Comments] Load Commentss Failure',
  props<{ error: any }>()             
);

export const loadComments = createAction(
  '[Comments] Load Commentss', 
  (data:LoadInfo<FilterComment>)=>({...data,SHOW_LOADING: 'SHOW_LOADING'})  
)

export const filterComments = createAction(
  '[Comments] Filter Comments',
  props<{filter:FilterComment}>()
);

export const paginationComments = createAction(
  '[Comments] Pagination Comments',
  props<{typeEventPagination :TypeEventPagination}>()
);


export const sortComments = createAction(
  '[Comments] Sort Comments',
  props<{sortInfo: SortInfo}>()
);

/**
 * End Actions for list
 */


/**
 * Action for add list
 */



 export const addDialogComment = createAction(
  '[Comments] Add Dialog Comments' 
);

export const addComment = createAction(
  '[Comments] Add Comment',
  props<{data : Comment}>() 
);
export const addCommentSuccess = createAction(
  '[Comments] Add Commentss Success'  
);

export const addCommentFailure = createAction(
  '[Comments] Add Comment Failure',
  props<{ error: any }>()             
);


/**
 * End 
 */

/**
 * Action for add list
 */

 export const editDialogComment = createAction(
  '[Comments] Edit Dialog Comment' ,
  props<{data : Comment}>()
);

export const updateComment = createAction(
  '[Comments] Update Comment',
  props<{data : Comment}>() 
);
export const updateCommentSuccess = createAction(
  '[Comments] Update Commentss Success'  
);

export const updateCommentFailure = createAction(
  '[Comments] Update Comment Failure',
  props<{ error: any }>()             
);


/**
 * End 
 */



/**
 * Action for cheking loading 
 */


export const queryBegin = createAction(
  '[Comments] Query begin',
  props<{data : string}>()
);

export const queryEnd = createAction(
  '[Comments] Query end',
  props<{data : string}>()
);

/**
 * End
 */

/**
 * Action for check extending ngrx
 */
 export const extraComments = createAction(
  '[Comments] Extra Comments',
  props<{data : string}>()
);



