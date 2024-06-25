import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from '../../store/shared.action';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private store: Store<AppState>) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  })

  onLoginSubmit() {
    const email: any = this.loginForm.value.email
    const password: any = this.loginForm.value.password
    this.store.dispatch(setLoadingSpinner({ status: true }))
    this.store.dispatch(loginStart({ email: email, password: password }))
  }
}
