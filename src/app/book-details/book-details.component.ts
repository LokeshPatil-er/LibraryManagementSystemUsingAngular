import { Component } from '@angular/core';
import { BooksListService } from '../books-list/books-list.service';
import { BookDetails } from '../models/book-details.model';
import { BookDetailsService } from './book-details.service';
import { ToastService } from '../shared/toast.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-books-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
    constructor(private router:ActivatedRoute,
                private booksListService:BooksListService,
                private bookDetailsService:BookDetailsService,
                private toastService:ToastService,
                private location:Location){}

    ngOnInit():void{
      this.GetPublishersAndCourses();

      this.selectBookId=this.router.snapshot.paramMap.get('bookId');
      if(this.selectBookId!==null && this.selectBookId!=='0')
      {
        this.isUpdateMode=true;
          this.loadBookDetail(this.selectBookId)
      }
    }

    PublishersListAtAddBook:any;
    CoursesListAtAddBook:any;

    selectBookId:any;
    isUpdateMode:boolean=false;


    // selectedPublisherAtAddBook:number | null=null;
    // selectedCourseAtAddBook:number |null=null;

    // bookName:string;
    // pagesCount:number;
    // edition:string;
    // editionYear:string;
    // isActive:boolean;
    // addCopiesCount:number;

    bookDetails:BookDetails=new BookDetails();

    // private getandSetDataOfAddBook():BookAdd{
    //   return{
    //     BookName:this.bookName,
    //     PublisherId:this.selectedPublisherAtAddBook,
    //     CourseId:this.selectedCourseAtAddBook,
    //     Edition:this.edition,
    //     EditionYear:this.editionYear,
    //     TotalCopies:this.addCopiesCount,
    //     Pages:this.pagesCount,
    //     IsActive:this.isActive

    //   }
    // }

    // AddBtnClick(form:NgForm){
     
    //  // this.BooksAddService.BookDataForAdd=this.getandSetDataOfAddBook()
     
    //   console.log(this.BookDataForAdd)
    //   if(form.invalid)
    //   {
    //     this.toastService.showErrorToast("Fill all required information and in correct format",'validation')
    //     return;
    //   }
    //   this.callAddBookApi(form);
    // }


    // clearBookDataForm()
    // {
    //   this.bookDetails=new BookDetails();
    
    // }

    callAddBookApi(form:NgForm){
      if(form.invalid)
        {
          this.toastService.showErrorToast("Fill all required information and in correct format",'validation')
          return;
        }

      this.bookDetailsService.BookDetailsSaveApi(this.bookDetails).subscribe((data:any)=>{
      debugger
        console.log(data.error)
        if(data?.success===true)
        {
          this.toastService.showSuccessToast(data.message,"Success")
          form.resetForm();
          
        }
        else{
          this.toastService.showErrorToast(data.message,"Error")
        }
      })
   
    }

    //use for get publisher and course list from api
    GetPublishersAndCourses(){
     this.booksListService.PublishersAndCoursesListApi().subscribe((Lists:any)=>{
            this.PublishersListAtAddBook=Lists.PublishersList;
            this.CoursesListAtAddBook=Lists.CoursesList;
           
     })
    }

    //loadBookDetail function create for get book detail based on bookId for update detail
    loadBookDetail(bookId:number){
        this.bookDetailsService.GetBookDetailById(bookId).subscribe((bookDetails:any)=>{
          this.bookDetails=bookDetails;
        })
    }

   cancel(){
     this.location.back();
   }
}
