import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPosts } from '../state/post.selectors';
import { AppState } from '../../app.state';
import { Post } from '../state/posts.state';
import { deletePost, loadPosts } from '../state/posts.action';
import { setLoadingSpinner } from '../../store/shared.action';

@Component({
  selector: 'app-posts-list',
  standalone: false,
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent {

  posts: any = []
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select(getPosts).subscribe((posts: any) => {
      this.posts = posts
    })
    this.store.dispatch(setLoadingSpinner({ status: true }))
    this.store.dispatch(loadPosts())
  }

  onDeletePost(post: Post) {
    let id: any = post.id
    this.store.dispatch(deletePost({ id }))
  }
}
