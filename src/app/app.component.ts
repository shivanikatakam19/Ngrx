import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { getError, getLoading } from './store/shared.selector';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ngrix';
  @ViewChild('content') content!: ElementRef;
  showLoader!: Observable<boolean>
  showError!: Observable<string>

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.router.navigateByUrl('auth/login')
    this.showLoader = this.store.select(getLoading)
    this.showError = this.store.select(getError)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
