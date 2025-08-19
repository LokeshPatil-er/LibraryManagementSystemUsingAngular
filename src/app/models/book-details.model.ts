export class BookDetails {
    BookId:number;
    BookName:string;
    Pages:number;
    Edition:string;
    EditionYear:string;
    TotalCopies:number;
    PublisherId:number |null=null;
    CourseId:number | null=null;
    PublisherName:string;
    CourseName:string;
    AvailableCount:number;
    IssueQuantity:number;
    IsActive:boolean =true;
  
}

