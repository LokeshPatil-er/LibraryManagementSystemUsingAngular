import { BookDetails } from "./book-details.model";

export class BooksIssueDetails {
    IssueDate:Date;
    DueDate:Date;
    MemberId:number;
    SelectedFilesForUpload:File[]=[]
    BookList:BookDetails[]=[]
    IsActive:boolean
    CreatedBy:number|null
    CreatedOn:Date|null
    ModifiedBy:number|null
    ModifiedOn:Date|null

    
  constructor() {
    this.BookList = []; 
  }
  
}
