import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>()

    constructor(private http: HttpClient) {

    }

    getPosts() {
        this.http
        .get<{message: string, posts: any}>('http://localhost:9000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }))
        .subscribe((transformedPosts) => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts])
        });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        //return {...this.posts.find(p => p.id === id)};
        return this.http.get<{_id: string, title: string, content:string}>('http://localhost:9000/api/posts/' + id);
    }

    addPost(title: string, content: string) {
       const post: Post = {id: null, title: title, content: content}
       this.http.post<{message: string, postId: string}>('http://localhost:9000/api/posts', post)
        .subscribe((responseData) => {
            post.id = responseData.postId;
            this.posts.push(post) 
            this.postsUpdated.next([... this.posts])
        });
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:9000/api/posts/' + postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id != postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    updatePost(postId: string, title: string, content: string) {
        const post: Post = {id: postId, title: title, content: content};
        this.http.put('http://localhost:9000/api/posts/' + postId, post)
        .subscribe(response => {
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p => p.id === p.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts])
        })
    }
}