import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginSuccess } from "./auth.actions";

const _authReducer = createReducer(initialState,
    on(loginSuccess, (state: any, action: any) => {
        return {
            ...state,
            user: action.user
        }
    }),
)

export function AuthReducer(state: any, action: any) {
    return _authReducer(state, action);
}