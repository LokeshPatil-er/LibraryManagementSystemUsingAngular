import { Component, Input } from '@angular/core';
import { BookDetails } from '../models/book-details.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../shared/toast.service';
import { BookDetailsService } from '../book-details/book-details.service';
import { BooksListService } from '../books-list/books-list.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrl: './book-details-modal.component.css'
})
export class BookDetailsModalComponent {


  constructor(private activeModal:NgbActiveModal,
              private toastService:ToastService,
              private bookDetailsService:BookDetailsService,
              private booksListService:BooksListService,
              private router:ActivatedRoute
  ){}


  @Input() mode: string='Add';
  @Input() selectedBookId:any;

  publishersListAtModal:any;
  coursesListAtModal:any;
 // selectBookId:any;

  bookDetails:BookDetails=new BookDetails();

  ngOnInit():void{
    this.GetPublishersAndCoursesForModal()
    //this.selectedBookId=this.router.snapshot.paramMap.get('bookId');
    if(this.selectedBookId!==null && this.selectedBookId!=='0')
    {
      
        this.loadBookDetail(this.selectedBookId)
    }
  }

  BookDetailsSaveUsingModal(form:NgForm){
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
            this.closeBookDetailsModal();
          }
          else{
            this.toastService.showErrorToast(data.message,"Error")
          }
        })
     
      }
  
      GetPublishersAndCoursesForModal(){
       this.booksListService.PublishersAndCoursesListApi().subscribe((Lists:any)=>{
              this.publishersListAtModal=Lists.PublishersList;
              this.coursesListAtModal=Lists.CoursesList;
             
       })
      }

    //loadBookDetail function create for get book detail in modal based on bookId for update detail
    loadBookDetail(bookId:number){
      this.bookDetailsService.GetBookDetailById(bookId).subscribe((bookDetails:any)=>{
        this.bookDetails=bookDetails;
      })
  }

    closeBookDetailsModal(){
        this.activeModal.close('refresh');
    }
}
