import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = ''
  enteredValue = ''
  @Output() postCreated = new EventEmitter()

  onAddPost() {
    const post = {
      title: this.enteredTitle, 
      content: this.enteredValue
    }

    console.log(post)

    this.postCreated.emit(post)
  }
}
