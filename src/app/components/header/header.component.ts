import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from '../../auth/state/auth.selectors';
import { User } from '../../../models/user.model';
import { logout } from '../../auth/state/auth.actions';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user!: User

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(getUser).subscribe((user: any) => {
      this.user = user
    })
  }

  logout() {
    this.store.dispatch(logout())
  }
}
