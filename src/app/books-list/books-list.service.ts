import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BooksListFilter } from '../models/books-list-filter.model';

@Injectable({
  providedIn: 'root'
})
export class BooksListService {



  baseUrl:string="http://localhost:56100/api/"
  constructor(private httpClient:HttpClient) { }

  

  BookListGet(filterParameter:BooksListFilter){
 
    return this.httpClient.post<any>(this.baseUrl+"Books/BookList",filterParameter);
  }

  PublishersAndCoursesListApi(){
    return this.httpClient.get(this.baseUrl+"Books/GetPublisherListAndCourseList");
  }
}
