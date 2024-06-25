import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCounter } from '../state/counter.selectors';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-counter-output',
  standalone: false,
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.css'
})
export class CounterOutputComponent implements OnInit {
  counter!: number
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select(getCounter).subscribe((counter: any) => {
      this.counter = counter
    })
  }
}
