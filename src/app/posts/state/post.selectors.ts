import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post, PostState } from "./posts.state";

const getPostState = createFeatureSelector<PostState>('post')

export const getPosts = createSelector(getPostState, state => {
    return state.posts
})

export const getPostbyId = createSelector(getPostState, (state: any, props: any) => {
    return state.posts.find((post: Post) => post.id == props.id)
})