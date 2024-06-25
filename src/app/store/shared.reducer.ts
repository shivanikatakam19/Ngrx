import { createReducer, on } from "@ngrx/store"
import { setErrorMessage, setLoadingSpinner } from "./shared.action"
import { initialSharedState } from "./shared.state";
import { loginSuccess } from "../auth/state/auth.actions";

const _sharedReducer = createReducer(initialSharedState,
    on(setLoadingSpinner, (state: any, action: any) => {
        return {
            ...state,
            isLoading: action.status,
        }
    }),
    on(setErrorMessage, (state: any, action: any) => {
        return {
            ...state,
            errorMessage: action.error
        }
    }),
    on(loginSuccess, (state: any) => {
        return {
            ...state,
            errorMessage: ''
        }
    })
)

export function sharedReducer(state: any, action: any) {
    return _sharedReducer(state, action);
}