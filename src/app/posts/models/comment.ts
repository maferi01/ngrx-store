import { SortInfo } from "../../services/models/filter.model";

export interface Comment {
  id: number;
  comment: string;
  author: string;
}

export interface FilterComment {
  author: string;
  comment: string;
}

export type IResponseComments = { link: string; comments: Comment[] };


export interface StateUiComments{
  filter?: FilterComment;
  order?: SortInfo;
  expandFilter?: boolean;
}



