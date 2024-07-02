import { createReducer, on } from "@ngrx/store";
import { initialState } from "./posts.state";
import { getPosts, deletePost, loadPostsSuccess, addPostSuccess } from "./posts.action";



const _postReducer = createReducer(initialState,
    on(getPosts, (state: any) => {
        return {
            ...state,
        }
    }),
    on(addPostSuccess, (state: any, action: any) => {
        let post = { ...action.post }
        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(loadPostsSuccess, (state: any, action: any) => {
        return {
            ...state,
            posts: action.post
        }
    })
)

export function postReducer(state: any, action: any) {
    return _postReducer(state, action);
}