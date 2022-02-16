import { createAction, props } from '@ngrx/store';


export const loadLoadingsFailure = createAction(
  '[Loading] Load Loadings Failure',
  props<{ error: any }>()
);

export const showLoading = createAction(
  '[Loading] Show Loading',
  props<{ actionSource: string, idGroupLoading?: string ,   idLoading?: string  }>()
);

export const hideLoading = createAction(
  '[Loading] Hide Loading',
  props<{ actionHide :string, idGroupLoading?: string,   idLoading?: string  }>()
);


//export type TypeShowLoading= typeof showLoading;

//let showLoading2: TypeShowLoading= showLoading;