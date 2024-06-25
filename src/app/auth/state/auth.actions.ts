import { createAction, props } from "@ngrx/store";
import { User } from "../../../models/user.model";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAILURE = '[auth page] login failure';

export const loginStart = createAction(
    LOGIN_START,
    props<{ email: string; password: string }>())
export const loginSuccess = createAction(
    LOGIN_SUCCESS, props<{ user: User }>()
)
export const loginFailure = createAction(
    LOGIN_FAILURE
)