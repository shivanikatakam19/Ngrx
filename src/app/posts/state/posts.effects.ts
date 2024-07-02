import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { setErrorMessage, setLoadingSpinner } from "../../store/shared.action";
import { PostService } from "../../../services/posts.service";
import { addPost, addPostSuccess, deletePost, loadPosts, loadPostsSuccess, updatePost } from "./posts.action";

@Injectable({
    providedIn: 'root'
})

export class PostsEffects {
    constructor(private actions$: Actions, private postService: PostService, private store: Store<AppState>) { }

    loadPosts$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadPosts),
                mergeMap((action: any) => {
                    return this.postService
                        .getPosts()
                        .pipe(map((data: any) => {
                            this.store.dispatch(setLoadingSpinner({ status: false }))
                            this.store.dispatch(loadPostsSuccess({ post: data }));
                        }),
                            catchError((error: any) => {
                                this.store.dispatch(setLoadingSpinner({ status: false }))
                                this.store.dispatch(setErrorMessage({ error: error.error.error.message }))
                                return of()
                            })
                        );
                })
            );
        }, {
        dispatch: false
    });

    addPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap((action: any) => {
                return this.postService
                    .addPost(action.post)
                    .pipe(map((data: any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const post = { ...action.post, id: data.name }
                        this.store.dispatch(addPostSuccess({ post: post }));
                    }),
                        catchError((error: any) => {
                            this.store.dispatch(setLoadingSpinner({ status: false }))
                            this.store.dispatch(setErrorMessage({ error: error.error.error.message }))
                            return of()
                        })
                    );
            })
        );
    }, {
        dispatch: false
    });

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            mergeMap((action: any) => {
                return this.postService
                    .updatePost(action.post)
                    .pipe(map((data: any) => {
                        this.store.dispatch(loadPosts());
                    }),
                        catchError((error: any) => {
                            this.store.dispatch(setErrorMessage({ error: error.error.error.message }))
                            return of()
                        })
                    );
            })
        );
    }, {
        dispatch: false
    });

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            mergeMap((action: any) => {
                return this.postService
                    .deletePost(action.id)
                    .pipe(map((data: any) => {
                        this.store.dispatch(loadPosts());
                    }),
                        catchError((error: any) => {
                            this.store.dispatch(setErrorMessage({ error: error.error.error.message }))
                            return of()
                        })
                    );
            })
        );
    }, {
        dispatch: false
    });
}