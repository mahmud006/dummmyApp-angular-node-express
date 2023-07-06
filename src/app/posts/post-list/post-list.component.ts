import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model'
import { PostService } from '../posts.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub!: Subscription;
  constructor(private postService: PostService) {
  }
  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
