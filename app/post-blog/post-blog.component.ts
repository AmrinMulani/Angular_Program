import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { BlogHttpService } from "../blog-http.service";
import { Console } from "@angular/core/src/console";
import { BlogService } from "./../blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-post-blog",
  templateUrl: "./post-blog.component.html",
  styleUrls: ["./post-blog.component.css"]
})
export class PostBlogComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private blogHttpService: BlogHttpService,
    private toastr: ToastrService
  ) //private vcr: ViewContainerRef
  {
    console.log("Blog create constructor");
    //this.toastr.setRootViewContainerRef(vcr);
  }
  public blogTitle: string;
  public blogBodyHtml: string;
  public blogDescription: string;
  public blogCategory: string;
  public possibleCategories = ["Comedy", "Drama", "Action", "Technology"];
  ngOnInit() {}
  //Create the blog
  public createBlog(): any {
    let blogData = {
      title: this.blogTitle,
      bodyHtml: this.blogBodyHtml,
      description: this.blogDescription,
      category: this.blogCategory
    };
    console.log("Blog create");
    this.blogHttpService.createBlog(blogData).subscribe(
      data => {
        console.log(data);
        console.log("I am blog create ");
        this.toastr.success("Blog is created successfully", "Success");
        console.log(data.blogId + "Hi i am blog id");
        setTimeout(() => {
          this.router.navigate(["/blog", data.data.blogId]);
        }, 1000);
      },
      error => {
        console.log("some error occured ");
        console.log(error.errorMessage);
        this.toastr.error("Some error occured", "Error");
      }
    );
  }
}
