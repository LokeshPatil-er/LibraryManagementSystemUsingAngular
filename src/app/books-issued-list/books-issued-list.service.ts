import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksIssuedListService {

  baseUrl:string=environment.apiBaseUrl;
  constructor(private httpClient:HttpClient) { }

  GetBooksIssuedList()
  {
    return this.httpClient.get(this.baseUrl+"BooksIssue/BooksIssuedList");
  }

  
}
