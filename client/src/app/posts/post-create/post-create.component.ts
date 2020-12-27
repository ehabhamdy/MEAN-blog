import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredValue = '';
  post: Post;
  isLoading = false;
  form: FormGroup;

  private mode = 'create';
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
        'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
        'content': new FormControl(null, {validators: [Validators.required]})
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(post => {
          this.isLoading = false;
          this.post = {id: post._id, title: post.title, content: post.content};
          this.form.setValue({
            'title': this.post.title, 
            'content': this.post.content
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }

    const title = this.form.value.title;
    const content = this.form.value.content;
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(title, content);
    } else  {
      this.postsService.updatePost(this.postId, title, content);
    }
    
    this.form.reset();
  }
}
