export interface Post {
    id?: number;
    title: string;
    description: string;
}

export interface PostState {
    posts: Post[]
}

export const initialState: PostState = {
    posts: [
        { id: 1, title: 'Sample 1', description: 'Sample 1 Description' },
        { id: 2, title: 'Sample 2', description: 'Sample 2 Description' },
        { id: 3, title: 'Sample 3', description: 'Sample 3 Description' }
    ]
}


