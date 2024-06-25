import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './counter/counter/counter.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'counter', component: CounterComponent },
    {
        path: 'posts', component: PostsListComponent,
        children: [
            { path: 'add', component: AddPostComponent },
            { path: 'edit/:id', component: EditPostComponent }
        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
