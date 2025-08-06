import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import{NgbAlertModule, NgbPaginationModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BookDetailsComponent } from './book-details/book-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BookDetailsModalComponent } from './book-details-modal/book-details-modal.component';





@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    HomeComponent,
    BookDetailsComponent,
    BookDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbAlertModule ,
    HttpClientModule,
    NgbPaginationModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgbTooltipModule,
    ToastrModule.forRoot({
      timeOut: 3000, 
      extendedTimeOut: 1000,
      closeButton: true,
      progressBar: true,
      disableTimeOut: false, 
    }),



  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
