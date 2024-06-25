import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { AuthResponse } from "../app/auth/models/AuthResponseData.type";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private httpClient: HttpClient) { }

    login(email: string, password: string): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`, {
            email, password,
            returnSecureToken: true
        })
    }

    formatUser(data: AuthResponse) {
        const expirationDate: Date = new Date(new Date().getTime() + Number(data.expiresIn) * 1000)
        const user = new User(data.email, data.idToken, data.localId, expirationDate)
        return user;
    }
}