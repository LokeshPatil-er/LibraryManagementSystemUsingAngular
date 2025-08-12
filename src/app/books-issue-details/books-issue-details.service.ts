import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BooksIssueDetailsService {

  baseUrl:string=environment.apiBaseUrl;

  constructor(private httpclient:HttpClient) { }

  //api call for getting member complete list
  GetMembersList(){
    return this.httpclient.get(this.baseUrl+"BooksIssue/MemberListGet");
  }

  //api call for get perticular member details by id
  GetMemberDetailsById(selectedMemberId:number){
    let params=new HttpParams()
    .set("MemberId",selectedMemberId);
    return this.httpclient.get(this.baseUrl+"BooksIssue/MemberDetailsById",{params});
  }

  //api call for active book list get
  GetBooksList()
  {
    return this.httpclient.get(this.baseUrl+"BooksIssue/BooksList");
  }

  
}
