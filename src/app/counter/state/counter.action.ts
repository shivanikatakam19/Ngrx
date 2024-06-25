import { createAction, props } from "@ngrx/store";

export const increment = createAction('increment')
export const decrement = createAction('decrement')
export const reset = createAction('reset')

export const customIncrement = createAction('customIncreement',
    props<{ value: number }>()
);

export const userNameChange = createAction('userNameChange')