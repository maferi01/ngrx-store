
import { z } from "zod";

export const CommentXsd= z.object({
  id: z.number().gt(0),
  comment: z.string(),
  author: z.string()
})

export const CommentRespXsd= z.array(CommentXsd).min(1);

export type Comment = z.infer<typeof CommentXsd>;
// export interface Comment {
//   id: number;
//   comment: string;
//   author: string;
// }

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



