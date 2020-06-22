import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = ''
  enteredValue = ''
  @Output() postCreated = new EventEmitter<Post>()

  onAddPost() {
    const post: Post = {
      title: this.enteredTitle, 
      content: this.enteredValue
    }

    console.log(post)

    this.postCreated.emit(post)
  }
}
