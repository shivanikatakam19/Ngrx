import { createAction, props } from "@ngrx/store";
import { Post } from "./posts.state";
export const ADD_POST_ACTION = '[posts page] add post'
export const UPDATE_POST_ACTION = '[posts page] edit post'
export const DELETE_POST_ACTION = '[posts page] delete post'

export const getPosts = createAction('getPosts')
export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>())
export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>())
export const deletePost = createAction(DELETE_POST_ACTION, props<{ post: Post }>())

