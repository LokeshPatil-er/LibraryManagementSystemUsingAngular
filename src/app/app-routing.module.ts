import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksIssueDetailsComponent } from './books-issue-details/books-issue-details.component';
import { BooksIssuedListComponent } from './books-issued-list/books-issued-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"BooksList",component:BooksListComponent,canActivate:[authGuard]},
  {path:"BooksAdd",component:BookDetailsComponent,canActivate:[authGuard]},
  {path:"BookDetailsUpdate/:bookId",component:BookDetailsComponent,canActivate:[authGuard]},
  {path:"BooksIssueDetailsAdd",component:BooksIssueDetailsComponent,canActivate:[authGuard]},
  {path:"BookIssueDetailsUpdate/:bookIssueId",component:BooksIssueDetailsComponent,canActivate:[authGuard]},
  {path:"BooksIssuedList",component:BooksIssuedListComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
