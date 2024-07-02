import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from '../../store/shared.action';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  })

  constructor(private store: Store<AppState>) { }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      const email: any = this.signupForm.value.email
      const password: any = this.signupForm.value.password
      this.store.dispatch(setLoadingSpinner({ status: true }))
      this.store.dispatch(signupStart({ email: email, password: password }))
    } else
      return;
  }
}
