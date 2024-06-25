import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "./auth.state"

export const AUTH_STATE_NAME = 'auth'

const getUserState = createFeatureSelector<AuthState>(AUTH_STATE_NAME)

export const getUser = createSelector(getUserState, state => {
    return state?.user
})