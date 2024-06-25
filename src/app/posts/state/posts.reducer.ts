import { createReducer, on } from "@ngrx/store";
import { initialState } from "./posts.state";
import { addPost, updatePost, getPosts, deletePost } from "./posts.action";



const _postReducer = createReducer(initialState,
    on(getPosts, (state: any) => {
        return {
            ...state,
        }
    }),
    on(addPost, (state: any, action: any) => {
        let post = { ...action.post }
        post.id = state.posts.length + 1
        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(updatePost, (state: any, action: any) => {
        const upadtedPosts = state.posts.map((post: any) => {
            return post.id == action.post.id ? action.post : post
        })
        return {
            ...state,
            posts: upadtedPosts
        }
    }),
    on(deletePost, (state: any, action: any) => {
        const updatePosts = state.posts.filter((post: any) => {
            return post.id != action.post.id
        })
        return {
            ...state,
            posts: updatePosts
        }
    })
)

export function postReducer(state: any, action: any) {
    return _postReducer(state, action);
}