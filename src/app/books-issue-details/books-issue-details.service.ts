import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BooksIssueDetailsService {

  baseUrl:string=environment.apiBaseUrl;

  constructor(private httpclient:HttpClient) { }

  GetMembersList(){
    return this.httpclient.get(this.baseUrl+"BooksIssue/MemberListGet");
  }

  GetMemberDetailsById(selectedMemberId:number){
    let params=new HttpParams()
    .set("MemberId",selectedMemberId);
    return this.httpclient.get(this.baseUrl+"BooksIssue/MemberDetailsById",{params});
  }
}
