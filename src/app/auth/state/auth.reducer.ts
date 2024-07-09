import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginSuccess, logout, signupSuccess } from "./auth.actions";

const _authReducer = createReducer(initialState,
    on(loginSuccess, (state: any, action: any) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(signupSuccess, (state: any, action: any) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(logout, (state: any) => {
        return {
            ...state,
            user: null
        }
    })
)

export function AuthReducer(state: any, action: any) {
    return _authReducer(state, action);
}