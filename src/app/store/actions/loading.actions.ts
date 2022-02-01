import { createAction, props } from '@ngrx/store';

// export const loadLoadings = createAction(
//   '[Loading] Load Loadings'
// );

// export const loadLoadingsSuccess = createAction(
//   '[Loading] Load Loadings Success',
//   props<{ data: any }>()
// );

export const loadLoadingsFailure = createAction(
  '[Loading] Load Loadings Failure',
  props<{ error: any }>()
);


export const showLoading = createAction(
  '[Loading] Show Loading',
  props<{ actionSource: string, idGroupLoading: string,   idLoading?: string  }>()
);

export const hideLoading = createAction(
  '[Loading] Hide Loading',
  props<{ actionHide :string, idGroupLoading: string,   idLoading?: string  }>()
);