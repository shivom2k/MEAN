import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  private mode = 'create';
  private postId:string;
  post :Post;4
  isLoading=false;

  constructor(public postsService: PostsService, public route:ActivatedRoute) {}
ngOnInit(): void {
  this.route.paramMap.subscribe((paramMap)=>{
    if(paramMap.has('postId')){
     this.mode='edit';
     this.postId = paramMap.get('postId');
     this.isLoading=true;
     this.postsService.getPostsById(this.postId).subscribe(postData=>{
      this.isLoading=false;
      this.post = {id:postData._id,title:postData.title,content:postData.content};
     })
    }
  });
}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading=true;
   if(this.mode === 'create'){ 
    this.postsService.addPost(form.value.title, form.value.content);
   }
   else{
    this.postsService.updatePost(this.postId,form.value.title, form.value.content);
   }
    this.postsService.getPosts();
    form.resetForm();
  }
}
