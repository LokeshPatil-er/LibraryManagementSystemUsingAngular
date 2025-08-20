import { Component, ViewChild ,ElementRef, Input} from '@angular/core';
import { BooksIssueDetailsService } from './books-issue-details.service';
import { BooksIssueDetails } from '../models/books-issue-details.model';
import { EventEmitter } from 'stream';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BooksListAtIssueModalComponent } from '../books-list-at-issue-modal/books-list-at-issue-modal.component';
import { BookDetails } from '../models/book-details.model';
import { NgForm } from '@angular/forms';
import { ToastService } from '../shared/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../shared/spinner.service';


@Component({
  selector: 'app-books-issue-details',
  templateUrl: './books-issue-details.component.html',
  styleUrl: './books-issue-details.component.css'
})
export class BooksIssueDetailsComponent {

  membersList:any[]=[];
  memberDetails:any={};
  selectedBookissueId:any;

  @ViewChild('inputFile') InputFiles:ElementRef<HTMLInputElement>;
  booksIssueDetailsModel:BooksIssueDetails=new BooksIssueDetails();

  isModalOpen=false;
  isBookIssueUpdateMode:boolean=false;
  constructor(private booksIssueservice:BooksIssueDetailsService,
              private modalService:NgbModal,
              private toastService:ToastService,
              private activeRouter:ActivatedRoute,
              private router :Router,
              private spinner:SpinnerService
              ){}

  ngOnInit():void{
    this.spinner.spinnerShow();

    this.getMembersList();
    this.selectedBookissueId=this.activeRouter.snapshot.paramMap.get('bookIssueId');
      if(this.selectedBookissueId!==null && this.selectedBookissueId!=='0')
      {
        this.isBookIssueUpdateMode=true;
          this.BookIssuedDetailsById(this.selectedBookissueId)
      }

      this.spinner.spinnerHide();
  }

//use to add file to SelectedFileForUpload
  onFileChange() {
    this.spinner.spinnerShow()

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
  
    this.spinner.spinnerHide();

    console.log(this.booksIssueDetailsModel.SelectedFilesForUpload);
  }
  
  //use for remove selected book from table
  removeFileFromSelected(name:string,fileName:string)
  {
    this.booksIssueDetailsModel.SelectedFilesForUpload=this.booksIssueDetailsModel.SelectedFilesForUpload.filter(b=>b.name!==name || b.FileName!==fileName)
  }
  //use to open modal and add selected Books to SelectedBooksFromModal
  openBookListModal()
  {
    
    console.log("selected books at open "+this.booksIssueDetailsModel.BookList)

     let booksListModalRef= this.modalService.open(BooksListAtIssueModalComponent,{size:'lg'});
     booksListModalRef.componentInstance.selectedBooksData=[...this.booksIssueDetailsModel.BookList];//pass the copy of list not a refernce


     booksListModalRef.result.then((selectedBooksList:BookDetails[])=>{
      if (selectedBooksList) {
        this.booksIssueDetailsModel.BookList = selectedBooksList;
      }
      }).catch(() => {});
  }

  //use for remove selected book from table
  removeBookFromSelectedList(removeBookId:number)
  {
    this.booksIssueDetailsModel.BookList=this.booksIssueDetailsModel.BookList.filter(b=>b.BookId!==removeBookId)
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

    const member = this.membersList.find((m:any) => m.MemberId === this.booksIssueDetailsModel.MemberId);

    if (member) {
      this.memberDetails.MobileNo = member.MobileNo;
    }
    

    // this.booksIssueservice.GetMemberDetailsById(this.booksIssueDetailsModel.MemberId).subscribe((details:any)=>{
    //     if(details!==null)
    //     {
    //       this.memberDetails=details;
    //     }
    // })
  }

 
//use to add or update issue realted details to db 
BooksIssueDetailsStored(issueForm:NgForm)
{
  this.spinner.spinnerShow()

    if(issueForm.invalid)
    {
      this.spinner.spinnerHide();

      this.toastService.showErrorToast("fill all requied information",'Validation Error');
      return;
    }

    const issueFormData=new FormData();

    issueFormData.append('bookIssueDetail',JSON.stringify( this.booksIssueDetailsModel));
    

    this.booksIssueDetailsModel.SelectedFilesForUpload.forEach((file:File)=>{
      issueFormData.append('issueSupportFile[]',file);
    })

    issueFormData.forEach((value, key) => {
      console.log(key, value);
    });

    this.booksIssueservice.BooksIssueStored(issueFormData).subscribe((response:any)=>{
        if(response.success)
        {
          this.toastService.showSuccessToast(response.message,'Issue Success')
          this.IssueFormReset(issueForm)
        }
        else
        {
          this.toastService.showErrorToast(response.message,'Error')
        }
    })

    this.spinner.spinnerHide();
}

//use for get single issue details with id
BookIssuedDetailsById(issueId:number)
  {
    this.booksIssueservice.GetBookIssueDetailsById(issueId).subscribe((details: any) => {
     this.booksIssueDetailsModel=details

    //  this.booksIssueDetailsModel.IssueDate = details.IssueDate ? details.IssueDate.split('T')[0] : null;
    //   this.booksIssueDetailsModel.DueDate = details.BookList[1].DueDate ? details.BookList[1].DueDate.split('T')[0] : null;


    // this.booksIssueDetailsModel.IssueDate = details.IssueDate 
    // ? details.IssueDate.split('T')[0] 
    // : null;

  //  this.booksIssueDetailsModel.DueDate = details.BookList[0].DueDate 
  //   ? details.BookList[0].DueDate.split('T')[0] 
  //   : null;

    if(this.booksIssueDetailsModel.MemberId){
      this.getMemberDetailsById();
    }
     console.log(this.booksIssueDetailsModel)
    });
    
  }


  //use for uploaded file download
  DownloadUploadedFile(filePath:string,fileName:string,bookIssueId:string)
  {
    this.spinner.spinnerShow();

    this.booksIssueservice.DownloadFile(filePath,bookIssueId).subscribe(blob=>{
      console.log(blob);
      const fileUrl=window.URL.createObjectURL(blob);
      const aTag=document.createElement('a');
      aTag.href=fileUrl
      aTag.download=fileName
      aTag.click();
      window.URL.revokeObjectURL(fileUrl);
    })

    this.spinner.spinnerHide();
  }

  //use for reset form data
  IssueFormReset(form:NgForm)
  {
    this.spinner.spinnerShow();

    this.booksIssueDetailsModel=new BooksIssueDetails();
    form.resetForm()
    if(this.isBookIssueUpdateMode)
    {
      this.router.navigate(['/BooksIssuedList'])
    }

    this.spinner.spinnerHide();
      
  }

}
