import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
//router module used for setting up the application level route
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BlogViewComponent } from "./blog-view/blog-view.component";
import { BlogCreateComponent } from "./blog-create/blog-create.component";
import { BlogEditComponent } from "./blog-edit/blog-edit.component";
import { AboutComponent } from "./about/about.component";
import { PostBlogComponent } from "./post-blog/post-blog.component";
import { NotFoundComponent } from "./not-found/not-found.component";
//import statement for service
import { BlogService } from "./blog.service";
import { BlogHttpService } from "./blog-http.service";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//import { ToastModule, Toast } from "ng2-toastr/ng2-toastr";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    BlogViewComponent,
    BlogCreateComponent,
    PostBlogComponent,
    BlogEditComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,

    //routerModule forRoot method to declare the possible routes in application
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "about", component: AboutComponent },
      { path: "blog/:blogId", component: BlogViewComponent },
      { path: "create", component: PostBlogComponent },
      { path: "edit/:blogId", component: BlogEditComponent },
      { path: "**", component: NotFoundComponent }
    ])
  ],
  providers: [BlogService, BlogHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
