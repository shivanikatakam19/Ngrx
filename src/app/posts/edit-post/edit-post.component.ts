import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updatePost } from '../state/posts.action';
import { Post } from '../state/posts.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ActivatedRoute } from '@angular/router';
import { getPostbyId } from '../state/post.selectors';

@Component({
  selector: 'app-edit-post',
  standalone: false,
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {
  editPostForm = new FormGroup({
    'id': new FormControl(),
    'title': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required)
  })

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      const id = params.get('id')
      this.store.select(getPostbyId, { id }).subscribe((post: any) => {
        this.editPostForm.patchValue({
          id: id,
          title: post.title,
          description: post.description
        })
      })
    })
  }

  onEditPost() {
    const post: Post = {
      id: this.editPostForm.value.id,
      title: this.editPostForm.value.title!,
      description: this.editPostForm.value.description!
    }
    this.store.dispatch(updatePost({ post }));
  }
}
