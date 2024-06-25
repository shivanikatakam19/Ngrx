import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { customIncrement, decrement, increment, reset, userNameChange } from '../state/counter.action';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-counter-buttons',
  standalone: false,
  templateUrl: './counter-buttons.component.html',
  styleUrl: './counter-buttons.component.css'
})
export class CounterButtonsComponent {

  value: any

  constructor(private store: Store<AppState>) {

  }

  onIncrement() {
    this.store.dispatch(increment())
  }

  onDecrement() {
    this.store.dispatch(decrement())
  }

  onReset() {
    this.store.dispatch(reset())
  }

  onCustomIncrement() {
    this.store.dispatch(customIncrement({ value: this.value }))
  }

  onUserNameChange() {
    this.store.dispatch(userNameChange())
  }
}
