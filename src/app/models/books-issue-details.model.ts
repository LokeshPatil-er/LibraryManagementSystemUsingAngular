import { BookDetails } from "./book-details.model";

export class BooksIssueDetails {
    BookIssueId:number;
    IssueDate:Date;
    DueDate:Date;
    MemberId:number;
    SelectedFilesForUpload:any[]=[]
    BookList:BookDetails[]=[]
    IsActive:boolean
    CreatedBy:number|null
    CreatedOn:Date|null
    ModifiedBy:number|null
    ModifiedOn:Date|null

    
 
  
}
