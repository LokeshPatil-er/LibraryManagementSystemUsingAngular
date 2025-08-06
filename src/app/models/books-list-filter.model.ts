export class BooksListFilter {
   BookName:string;
   PublisherId:number |null=null;
   PublisherIdList:number[]
   CourseId:number | null=null;
   CoursesIdList:number[]
   IsActive:boolean | null=null;
   PageSize:number=5;
   ColumnNameForSort:string="BookName";
   sortOrderForColumn:string="ASC";
   PageNumber:number=1;

   
}
