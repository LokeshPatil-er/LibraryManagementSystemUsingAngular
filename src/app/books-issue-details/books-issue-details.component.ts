import { Component } from '@angular/core';
import { BooksIssueDetailsService } from './books-issue-details.service';
import { BooksIssueDetails } from '../models/books-issue-details.model';

@Component({
  selector: 'app-books-issue-details',
  templateUrl: './books-issue-details.component.html',
  styleUrl: './books-issue-details.component.css'
})
export class BooksIssueDetailsComponent {

  membersList:any[]=[];
  memberDetails:any={};

  booksIssueDetailsModel:BooksIssueDetails=new BooksIssueDetails();

  constructor(private booksIssueservice:BooksIssueDetailsService){}

  ngOnInit():void{
    this.getMembersList();
  }


  //use to calculate Due date based on Issue Date
  DueDateCalculate(){
    if(this.booksIssueDetailsModel.IssueDate!==null)
    {
        this.booksIssueDetailsModel.DueDate=new Date(this.booksIssueDetailsModel.IssueDate);
        this.booksIssueDetailsModel.DueDate.setDate(this.booksIssueDetailsModel.DueDate.getDate()+30);
    }

  }

  //use for get members list 
  getMembersList(){
    this.booksIssueservice.GetMembersList().subscribe((list:any)=>{
      if(list!==null)
      {
        this.membersList=list;
      }
    })
  }

  //use for to get member and there contact details  based on id 
  getMemberDetailsById(){
    this.booksIssueservice.GetMemberDetailsById(this.booksIssueDetailsModel.MemberId).subscribe((details:any)=>{
        if(details!==null)
        {
          this.memberDetails=details;
        }
    })
  }

}
