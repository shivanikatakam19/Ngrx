import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from '../state/counter.selectors';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  userName!: string

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select(getUser).subscribe((userName: any) => {
      this.userName = userName
    })
  }
}
