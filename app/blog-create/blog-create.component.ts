import { Component, OnInit } from "@angular/core";
import { BlogHttpService } from "../blog-http.service";
import { Console } from "@angular/core/src/console";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-blog-create",
  templateUrl: "./blog-create.component.html",
  styleUrls: ["./blog-create.component.css"]
})
export class BlogCreateComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private blogHttpService: BlogHttpService
  ) {
    console.log("Blog create constructor");
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
        console.log("I am blog view");
        alert("Blog is created successfully");
        setTimeout(() => {
          this.router.navigate(["/blog", data.data.blogId]);
        }, 1000);
      },
      error => {
        console.log("some error occured ");
        console.log(error.errorMessage);
      }
    );
  }
}
