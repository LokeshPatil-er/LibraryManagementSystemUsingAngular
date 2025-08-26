import { Component } from '@angular/core';
import { BooksIssuedListService } from './books-issued-list.service';
import { SpinnerService } from '../shared/spinner.service';

@Component({
  selector: 'app-books-issued-list',
  templateUrl: './books-issued-list.component.html',
  styleUrl: './books-issued-list.component.css'
})
export class BooksIssuedListComponent {

  booksIssuedList:any;
  isCollapsed=true;
  selectedBookRowIndex: number | null = null;
  selectedFilesRowIndex: number | null = null;




  constructor(private booksIssueListService:BooksIssuedListService){}
  ngOnInit():void{
   
    this.BooksIssuedList();
  
  }

  toggleCollapse(index: number,columnName:string) {
    if(columnName==='Books')
      this.selectedBookRowIndex = this.selectedBookRowIndex === index ? null : index;
    if(columnName==='Files')
      this.selectedFilesRowIndex = this.selectedFilesRowIndex === index ? null : index;
  }

  BooksIssuedList(){
    this.booksIssueListService.GetBooksIssuedList().subscribe((list:any)=>{
          this.booksIssuedList=list;

    })
  }

  
}
