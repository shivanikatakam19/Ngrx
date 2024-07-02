export interface Post {
    id?: number;
    title: string;
    description: string;
}

export interface PostState {
    posts: Post[]
}

export const initialState: PostState = {
    posts: []
}


