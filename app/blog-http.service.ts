import { Injectable } from "@angular/core";
//import http client to make the requests
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
//import observable related code
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
//import { catchError } from "rxjs/operators";
import "rxjs/add/operator/do";
//import { HttpClien} from "@angular/common/http";
//import {Observable, throwError} from 'rxjs';
//import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BlogHttpService {
  public allBlogs: any;
  //public currentBlog: any;
  public baseUrl = "https://blogapp.edwisor.com/api/v1/blogs";
  private authToken =
    "MzE1ZDRiZDE5NWI3ZDYxZmMwYWRjNjI3OWNkYjZjY2RjYTZlODgwMzUzMmYzM2QxMWY5NWNiNjgyMWZjZmUyNDk0OGFkZDgzOWYxNjA1Nzk0YjJiOGNiNTI1YmNjM2E0Zjk0ZDkxNzNkZGZkYzRkOGYwN2MwMDRkNDliMTVkNzJkMA==";
  constructor(private _http: HttpClient) {
    console.log("blog-http constructor called");
  }
  private handleError(err: HttpErrorResponse) {
    console.log("Handle error Http call");
    console.log(err.message);
    return Observable.throw(err.message);
  }
  public getAllBlogs(): any {
    /*console.log("getAllBLogs Method");
    return this.allBlogs;*/
    let myResponse = this._http.get(
      this.baseUrl + "/all" + "?authToken=" + this.authToken
    );
    console.log(myResponse);
    return myResponse;
  }

  //method to retrieve single particular blog
  /*public getSingleBlogInformation(currentBlogId): any {
    let myId = currentBlogId;
    console.log(myId + "I am get view blog http");
    let myResponse = this._http.get(
      this.baseUrl + "/view/" + currentBlogId + "?authToken=" + this.authToken
    );
    console.log(myResponse);
    return myResponse;
  }*/
  public getSingleBlog(blogId): any {
    let myResponse = this._http.get(
      this.baseUrl + "/view" + "/" + blogId + "?authToken=" + this.authToken
    );
    return myResponse;
  } // end get single blog

  public createBlog(blogData: any): any {
    console.log("I am create of blog http" + blogData);
    let myResponse = this._http.post(
      this.baseUrl + "/create" + "?authToken=" + this.authToken,
      blogData
    );
    return myResponse;
  } // end create blog

  public deleteBlog(blogId): any {
    let data = {};
    let myResponse = this._http.post(
      this.baseUrl + "/" + blogId + "/delete" + "?authToken=" + this.authToken,
      data
    );
    return myResponse;
  } // end delete blog

  public editBlog(blogId, blogData): any {
    let myResponse = this._http.put(
      this.baseUrl + "/" + blogId + "/edit" + "?authToken=" + this.authToken,
      blogData
    );
    return myResponse;
  } // end delete blog
}
