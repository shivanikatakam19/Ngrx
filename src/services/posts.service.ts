import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Post } from "../app/posts/state/posts.state";

@Injectable({
    providedIn: 'root'
})

export class PostService {

    constructor(private httpClient: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.httpClient.get(`https://ngrx-eab22-default-rtdb.firebaseio.com/posts.json`).pipe(map((data: any) => {
            const posts: any[] = []
            for (let key in data) {
                posts.push({ ...data[key], "id": key })
            }
            return posts
        }))
    }

    addPost(requestObj: Post): Observable<{ name: string }> {
        return this.httpClient.post<{ name: string }>('https://ngrx-eab22-default-rtdb.firebaseio.com/posts.json', requestObj)
    }

    updatePost(post: Post): Observable<{ name: string }> {
        const postData = { [post.id!]: { title: post.title, description: post.description } }
        return this.httpClient.patch<{ name: string }>('https://ngrx-eab22-default-rtdb.firebaseio.com/posts.json', postData)
    }

    deletePost(id: string) {
        return this.httpClient.delete(`https://ngrx-eab22-default-rtdb.firebaseio.com/posts/${id}.json`)
    }
}