import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../blog.service";
import { BlogHttpService } from "../blog-http.service";
//import { ToastsM } from "ng2-toastr/ng2-toastr";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";

@Component({
  selector: "app-blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.css"],
  providers: [Location]
})
export class BlogViewComponent implements OnInit, OnDestroy {
  //empty object
  public currentBlog: any;
  /*
  public allBlogs = [
    {
      blogId: "1",
      lastModified: "2017-10-20T20:45:51.628Z",
      created: "2017-10-20T20:45:51.628Z",
      tags: ["humuor", "Standup comedy "],
      author: "Admin",
      category: "Comedy",
      isPublished: true,
      views: 0,
      bodyHtml: "this is blog body",
      description: "this is blog 1 description",
      title: "This is blog1"
    },
    {
      blogId: "2",
      lastModified: "2017-10-21T20:45:51.85Z",
      created: "2017-10-20T20:45:51.628Z",
      tags: [],
      author: "Admin",
      category: "Comedy",
      isPublished: true,
      views: 0,
      bodyHtml: "<h1>this is blog body</h1><p>small text</p>",
      description: "this is description of the example blog",
      title: "This is example blog1"
    },
    {
      blogId: "3",
      lastModified: "2017-10-14T14:45:51.85Z",
      created: "2017-10-20T20:45:51.628Z",
      tags: [],
      author: "Admin",
      category: "Comedy",
      isPublished: true,
      views: 0,
      bodyHtml: "this is blog body this is blog body ",
      description: "this is 3 blog description",
      title: "This is 3 blog"
    }
  ];*/
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private blogHttpService: BlogHttpService,
    private toastr: ToastrService,
    private location: Location
  ) {
    console.log("Blog Constructor called ");
  }

  ngOnInit() {
    console.log("Blog ngonInit called");
    //getting the id of the blog
    let myBlogId = this._route.snapshot.paramMap.get("blogId");
    console.log(myBlogId);
    //this.currentBlog = this.blogService.getSingleBlogInformation(myBlogId);
    this.blogHttpService.getSingleBlog(myBlogId).subscribe(
      data => {
        console.log(data);
        console.log("I am blog view");
        this.currentBlog = data["data"];
      },
      error => {
        console.log("some error occured ");
        console.log(error.errorMessage);
      }
    );

    console.log(this.currentBlog);
  }
  deleteThisBlog(): any {
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Blog Deleted successfully", "Success!");
        setTimeout(() => {
          this.router.navigate(["/home"]);
        }, 2000);
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
        this.toastr.error("Some error occured", "Error");
      }
    );
  } // end delete this blog

  ngOnDestroy() {
    console.log("Blog ngOnDestroy called");
  }
  /*public getSingleBlogInformation(currentBlogId): any {
    //using a for of loop here from type script

    for (let blog of this.allBlogs) {
      if (blog.blogId == currentBlogId) {
        this.currentBlog = blog;
      }
    }

    console.log(this.currentBlog);
  }*/
  goBackToPreviousPage(): any {
    this.location.back();
  }
}
