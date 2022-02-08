

import { z } from "zod";

export const PostXsd= z.object({
  id: (z.number().gt(0)),
  title: z.string(),
  author: z.string()
})


export const PostRespXsd= z.object({
  body:   z.array(PostXsd)
}
);


export type Post = z.infer<typeof PostXsd>;


export interface FilterPost {
  author: string;
  title: string;
}

export type IResponsePosts = { link: string; data: Post[] };





