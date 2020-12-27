import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post content'},
  //   {title: 'Second Post', content: 'This is the second post content'},
  //   {title: 'Third Post', content: 'This is the third post content'}
  // ]

  posts: Post[] = []
  isLoading = false;
  private postSub: Subscription;

  constructor(public postService: PostsService) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts()
    // .subscribe(data => {
    //   this.posts = data.posts;
    // });
    
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts
    });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe()
  }
}
