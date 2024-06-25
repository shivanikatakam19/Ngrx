import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './state/auth.reducer';
import { AUTH_STATE_NAME } from './state/auth.selectors';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
]

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
        EffectsModule.forFeature([AuthEffects]),
        HttpClientModule
    ],
    providers: [],
    schemas: []
})
export class AuthModule { }
