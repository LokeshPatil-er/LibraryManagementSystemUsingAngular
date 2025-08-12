import { Component, Input, Output } from '@angular/core';
import { BooksListService } from '../books-list/books-list.service';
import { BooksIssueDetailsService } from '../books-issue-details/books-issue-details.service';
import { BooksListFilter } from '../models/books-list-filter.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookDetails } from '../models/book-details.model';

@Component({
  selector: 'app-books-list-at-issue-modal',
  templateUrl: './books-list-at-issue-modal.component.html',
  styleUrl: './books-list-at-issue-modal.component.css'
})
export class BooksListAtIssueModalComponent {
   
  booksList:BookDetails[]=[];
  TotalRecords:number;
 

  isBookListGet=false

  @Input() selectedBooksData:BookDetails[]=[];

  booksListFilters:BooksListFilter=new BooksListFilter();

  constructor(private booksListService:BooksListService,
              private activeModal:NgbActiveModal
  ){}

  ngOnInit():void{
    this.getBookList();
  }

  getBookList()
  {
    this.booksListService.BookListGet(this.booksListFilters).subscribe((list:any)=>{
      if(list!==null )
      {
        console.log(list);
        this.booksList=list.bookList;
        this.TotalRecords=list.TotalRecords
        this.isBookListGet=true
      }

    })
  }

  isBookSelected(bookId:number):boolean
  {
    return this.selectedBooksData.some(b=>b.BookId===bookId)
  }

  addCheckdBookInfo(booksDetail:BookDetails,event:any){
    if (event.target.checked) {
      if (!this.isBookSelected(booksDetail.BookId)) {
        this.selectedBooksData.push(booksDetail);
      }
    } else {
      this.selectedBooksData = this.selectedBooksData.filter(b => b.BookId !== booksDetail.BookId);
    }
   
  }

  saveSeleted()
  {
    this.activeModal.close(this.selectedBooksData)
  }

  closeActiveModal(){
    console.log(this.selectedBooksData)
    this.activeModal.dismiss();
  }
}
