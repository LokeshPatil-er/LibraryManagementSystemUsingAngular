import { Component, ViewChild ,ElementRef, Input} from '@angular/core';
import { BooksIssueDetailsService } from './books-issue-details.service';
import { BooksIssueDetails } from '../models/books-issue-details.model';
import { EventEmitter } from 'stream';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BooksListAtIssueModalComponent } from '../books-list-at-issue-modal/books-list-at-issue-modal.component';
import { BookDetails } from '../models/book-details.model';


@Component({
  selector: 'app-books-issue-details',
  templateUrl: './books-issue-details.component.html',
  styleUrl: './books-issue-details.component.css'
})
export class BooksIssueDetailsComponent {

  membersList:any[]=[];
  memberDetails:any={};

  SelectedBooksFromModal:BookDetails[]=[];

  @ViewChild('inputFile') InputFiles:ElementRef<HTMLInputElement>;
  booksIssueDetailsModel:BooksIssueDetails=new BooksIssueDetails();

  isModalOpen=false;
  constructor(private booksIssueservice:BooksIssueDetailsService,
              private modalService:NgbModal
              ){}

  ngOnInit():void{
    this.getMembersList();
  }


  onFileChange() {
    const files = this.InputFiles.nativeElement.files;
  
    if (files && files.length > 0) {

      if (!Array.isArray(this.booksIssueDetailsModel.SelectedFilesForUpload)) {
        this.booksIssueDetailsModel.SelectedFilesForUpload = [];
      }
  
      for (let i = 0; i < files.length; i++) {
        const newFile = files[i];
  
        //first check selected file is present or not in model property
        const alreadyExists = this.booksIssueDetailsModel.SelectedFilesForUpload.some(
          existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size
        );
  
        //new file push when it is not alredy present
        if (!alreadyExists) {
          this.booksIssueDetailsModel.SelectedFilesForUpload.push(newFile);
        }
      }
    }
  
    console.log(this.booksIssueDetailsModel.SelectedFilesForUpload);
  }
  
  openBookListModal()
  {
    console.log("selected books at open "+this.SelectedBooksFromModal)
     let booksListModalRef= this.modalService.open(BooksListAtIssueModalComponent,{size:'lg'});
     booksListModalRef.componentInstance.selectedBooksData=[...this.SelectedBooksFromModal];//pass the copy of list not a refernce


     booksListModalRef.result.then((selectedBooksList:BookDetails[])=>{
      if (selectedBooksList) {
        this.SelectedBooksFromModal = selectedBooksList;
      }
      }).catch(() => {});
  }

  removeBookFromSelectedList(removeBookId:number)
  {
    this.SelectedBooksFromModal=this.SelectedBooksFromModal.filter(b=>b.BookId!==removeBookId)
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
