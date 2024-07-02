import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, exhaustMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app/app.state';
import { getToken } from '../app/auth/state/auth.selectors';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(getToken).pipe(
            exhaustMap((token: any) => {
                if (!token)
                    return next.handle(req)
                let modifiedRequest = req.clone({
                    params: req.params.append('auth', token)
                });
                return next.handle(modifiedRequest)
            })
        );
    }
}