import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess, logout, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { User } from "../../../models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { setErrorMessage, setLoadingSpinner } from "../../store/shared.action";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>, private router: Router) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action: any) => {
                return this.authService
                    .login(action.email, action.password)
                    .pipe(map((data: any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.router.navigateByUrl('/')
                        const user: User = this.authService.formatUser(data);
                        return loginSuccess({ user });
                    }),
                        catchError((error: any) => {
                            this.store.dispatch(setLoadingSpinner({ status: false }))
                            this.store.dispatch(setErrorMessage({ error: error.error.error.message }))
                            return of()
                        })
                    );
            })
        );
    });

    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action: any) => {
                return this.authService
                    .signup(action.email, action.password)
                    .pipe(map((data: any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.router.navigateByUrl('/')
                        const user: User = this.authService.formatUser(data);
                        return signupSuccess({ user });
                    }),
                        catchError((error: any) => {
                            this.store.dispatch(setLoadingSpinner({ status: false }))
                            this.store.dispatch(setErrorMessage({ error: error.error.error.message }))
                            return of()
                        })
                    );
            })
        );
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logout),
            map((action: any) => {
                this.router.navigate(['auth'])
            })
        );
    }, { dispatch: false });
}