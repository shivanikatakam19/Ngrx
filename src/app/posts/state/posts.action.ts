import { createAction, props } from "@ngrx/store";
import { Post } from "./posts.state";


export const ADD_POST_ACTION = '[posts page] add post'
export const ADD_POST_SUCCESS = '[posts page] add post success'
export const ADD_POST_FAILURE = '[posts page] add post failure'

export const UPDATE_POST_ACTION = '[posts page] edit post'

export const DELETE_POST_ACTION = '[posts page] delete post'

export const LOAD_POSTS = '[posts page] load posts'
export const LOAD_POSTS_SUCCESS = '[posts page] load post success'
export const LOAD_POSTS_FAILURE = '[posts page] load post failure'


export const getPosts = createAction('getPosts')
export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>())
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: Post }>())


export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>())

export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>())


export const loadPosts = createAction(LOAD_POSTS)
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ post: Post }>())
