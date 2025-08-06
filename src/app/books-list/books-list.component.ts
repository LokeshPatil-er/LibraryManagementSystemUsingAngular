import { Component, model, Output } from '@angular/core';
import { BooksListService } from './books-list.service';
import{BooksListFilter} from '../models/books-list-filter.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';
import { ToastService } from '../shared/toast.service';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent {

    BookList:any;
    PublisherList:any;
    CourseList:any;
    
    isLoadedBookList:boolean=false;

    TotalRecords:number;

    filterParameter:BooksListFilter=new BooksListFilter();

    constructor(private booksListServices:BooksListService,
                private toastService:ToastService,
                private modalService:NgbModal,
               ){}

    ngOnInit():void{
    
      this.PublishersAndCourseListGet();

      let storedFilters=this.retrieveSearchAppliedFilter()

      if(storedFilters!==null)
      {
        this.filterParameter=storedFilters;
      }
      
      this.BooksList();
    }
  
    
    ResetBtnClick(){
     this.filterParameter=new BooksListFilter();
      this.BooksList()
    }

 
  //use for sotring search filter applied at session storege 
  saveSearchAppliedFilter(): void {
    // Save only if running in the browser
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.setItem('searchFilters', JSON.stringify(this.filterParameter));
    }
  }


  //use for retrieve search filter from session storage 
  retrieveSearchAppliedFilter() {
    // Retrieve only if running in the browser
    if (typeof window !== 'undefined' && sessionStorage) {
      const filters = sessionStorage.getItem('searchFilters');
      return filters ? JSON.parse(filters) : null;
    }
    return null;
  }

  newBookAddBtnClick(modeOfOpen:string){
      const modalInstance= this.modalService.open(BookDetailsModalComponent,{size:'lg'})
         modalInstance.componentInstance.mode=modeOfOpen;


         this.refreshBookList(modalInstance);

  }



  UpdateBookDetails(modeOfOpen:string,bookId:number)
  {
    const UpdateModalInstance=this.modalService.open(BookDetailsModalComponent,{size:'lg'})
    UpdateModalInstance.componentInstance.mode=modeOfOpen;
    UpdateModalInstance.componentInstance.selectedBookId=bookId;

    //when book get successfully update than it will refresh our list page
    this.refreshBookList(UpdateModalInstance);
  }

  //use for refresh booklist after modal opertion complet or cancel
  refreshBookList(modalInstance:any){

    modalInstance.result.then((result:any)=>{
      if(result==='refresh')
        this.BooksList()
      
     })
  }


    //use to show tooltip on column soting icon
  getSortHint(column: string): string {
      const isActive = this.filterParameter.ColumnNameForSort === column;
      const isAsc = this.filterParameter.sortOrderForColumn === 'ASC';
    
      if (!isActive) return 'Click to sort ASC';
    
      return isAsc ? 'Click to sort DESC' : 'Click to sort ASC';
   } 
    

    //use for apply sorting on  columns of list table
  sortData(columnName: string) {
      if (this.filterParameter.ColumnNameForSort === columnName) {
        this.filterParameter.sortOrderForColumn = this.filterParameter.sortOrderForColumn === 'ASC' ? 'DESC' : 'ASC';
      } else {
        this.filterParameter.ColumnNameForSort = columnName;
        this.filterParameter.sortOrderForColumn = 'ASC';
      }
    
      this.BooksList(); 
   }

   //use to calculate From of pagination summary shown below list table 
   get showingFrom():number{
     if (!this.TotalRecords || !this.filterParameter.PageSize || !this.filterParameter.PageNumber) return 0;
     return (this.filterParameter.PageSize * (this.filterParameter.PageNumber-1))+1
   }
    
   //use to calculate To of pagination summary shown below list table
   get showingTo():number{
      if (!this.TotalRecords || !this.filterParameter.PageSize || !this.filterParameter.PageNumber) return 0;
      const to = this.filterParameter.PageSize * this.filterParameter.PageNumber;
      return to > this.TotalRecords ? this.TotalRecords : to;
   }


  //use for get bookslist and also fiterted books list from api
    BooksList(){
     // this.BooksListServices.filterParameter=this.inputFilterData();
    
     this.saveSearchAppliedFilter()
      this.booksListServices.BookListGet(this.filterParameter).subscribe((data:any)=>{

        this.BookList=data.bookList;
      
        this.TotalRecords=data.TotalRecords;
        
        //use for show pagination
         this.isLoadedBookList=true;
        
        console.log(this.BookList)
        
        
       
       
      })
      
    }

    PublishersAndCourseListGet()
    {
     
      this.booksListServices.PublishersAndCoursesListApi().subscribe((lists:any)=>{
        this.PublisherList=lists.PublishersList;
        this.CourseList=lists.CoursesList;

      })
    }

    deleteBook(bookId:number,bookName:string){
        if(bookId===0 && bookId===null)
        {
          this.toastService.showErrorToast("book delete failed..try again",'Id Error')
          return;
        }
        
        if(!confirm(`Are you sure to delete "${bookName}" book`)) return;

        this.booksListServices.DeleteBookApi(bookId).subscribe((result:any)=>{
          if(result.success){
            this.toastService.showSuccessToast(result.message,'Deleted Success');
            this.BooksList();
          }
          else
            this.toastService.showErrorToast(result.message,'Delete failed')
        })
    }
}
