import { Injectable } from '@angular/core';
import { Post } from './post.model'
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts])
      });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPosts(title: string, content: string) {
    const post: Post = {
      id: '',
      title: title,
      content: content
    }
    this.http.post<{ message: string, id: string }>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        post.id = res.id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
  }
  deletePost(id: string) {
    this.http.delete('http://localhost:3000/api/posts/' + id)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== id)
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts])
      })
  }
}
