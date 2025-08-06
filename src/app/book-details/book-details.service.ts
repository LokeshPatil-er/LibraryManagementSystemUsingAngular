import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDetails } from '../models/book-details.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
    

  baseUrl:string=environment.apiBaseUrl
  constructor(private httpClient:HttpClient) { }

  

 GetBookDetailById(bookId:number)
 {

  let params=new HttpParams()
  .set('bookId',bookId)

   return this.httpClient.get(this.baseUrl+"Books/loadBookDetails",{params});
 }


  BookDetailsSaveApi(BookData:BookDetails)
  {
    return this.httpClient.post<any>(this.baseUrl+"Books/BookDetailsSave",BookData);
  }
}
