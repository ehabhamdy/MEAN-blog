import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = ''
  enteredValue = ''

  constructor(public postsService: PostsService) {

  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
   
    const title = form.value.title;
    const content = form.value.content;

    console.log("sdfsds", title)


    this.postsService.addPost(title, content)
  }
}
