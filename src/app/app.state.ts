import { counterReducer } from "./counter/state/counter.reducer";
import { counterState } from "./counter/state/counter.state";
import { postReducer } from "./posts/state/posts.reducer";
import { PostState } from "./posts/state/posts.state";
import { sharedReducer } from "./store/shared.reducer";
import { SHARED_STATE_NAME } from "./store/shared.selector";
import { SharedState } from "./store/shared.state";

export interface AppState {
    counter: counterState,
    post: PostState
    [SHARED_STATE_NAME]: SharedState
}

export const AppReducer = {
    counter: counterReducer,
    post: postReducer,
    [SHARED_STATE_NAME]: sharedReducer
}