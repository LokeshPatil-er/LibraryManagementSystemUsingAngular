import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BooksListFilter } from '../models/books-list-filter.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksListService {



  baseUrl:string=environment.apiBaseUrl;
  constructor(private httpClient:HttpClient) { }

  

  BookListGet(filterParameter:BooksListFilter){
 
    return this.httpClient.post<any>(this.baseUrl+"Books/BookList",filterParameter);
  }

  PublishersAndCoursesListApi(){
    return this.httpClient.get(this.baseUrl+"Books/GetPublisherListAndCourseList");
  }

  //api call for delete book opertion take book id as parameter
  DeleteBookApi(selectedBookId:number)
  {
    let params=new HttpParams()
    .set('BookId',selectedBookId)
    return this.httpClient.get(this.baseUrl+"Books/deleteBook",{params})
  }
}
