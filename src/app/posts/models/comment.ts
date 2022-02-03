
export interface Comment {
  id: number;
  comment: string;
  author: string;
}

export interface FilterComment {
  author: string;
  comment: string;
  id:string;
}

export type IResponseComments = { link: string; data: Comment[] };


// export interface StateUiComments{
//   filter?: FilterComment;
//   order?: SortInfo;
//   expandFilter?: boolean;
// }



