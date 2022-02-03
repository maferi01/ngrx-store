
export interface Post {
  id: number;
  title: string;
  author: string;
}

export interface FilterPost {
  author: string;
  title: string;
}

export type IResponsePosts = { link: string; data: Post[] };


// export interface StateUiPosts{
//   filter?: FilterPost;
//   order?: SortInfo;
//   expandFilter?: boolean; 
// }



