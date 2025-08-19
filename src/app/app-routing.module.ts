import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksIssueDetailsComponent } from './books-issue-details/books-issue-details.component';
import { BooksIssuedListComponent } from './books-issued-list/books-issued-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"BooksList",component:BooksListComponent},
  {path:"BooksAdd",component:BookDetailsComponent},
  {path:"BookDetailsUpdate/:bookId",component:BookDetailsComponent},
  {path:"BooksIssueDetailsAdd",component:BooksIssueDetailsComponent},
  {path:"BookIssueDetailsUpdate/:bookIssueId",component:BooksIssueDetailsComponent},
  {path:"BooksIssuedList",component:BooksIssuedListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
