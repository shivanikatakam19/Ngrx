import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { addPost } from '../state/posts.action';
import { Post } from '../state/posts.state';
import { setLoadingSpinner } from '../../store/shared.action';

@Component({
  selector: 'app-add-post',
  standalone: false,
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {


  constructor(private store: Store<AppState>) { }

  addPostForm = new FormGroup({
    'title': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required)
  })


  onAddPost() {
    const post: Post = {
      title: this.addPostForm.value.title!,
      description: this.addPostForm.value.description!
    }
    this.store.dispatch(setLoadingSpinner({ status: true }))
    this.store.dispatch(addPost({ post }));
    this.addPostForm.reset()
  }
}
