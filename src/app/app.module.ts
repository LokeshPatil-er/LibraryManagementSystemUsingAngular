import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPaginationModule, NgbModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookDetailsModalComponent } from './book-details-modal/book-details-modal.component';
import { BooksIssueDetailsComponent } from './books-issue-details/books-issue-details.component';
import { BooksListAtIssueModalComponent } from './books-list-at-issue-modal/books-list-at-issue-modal.component';
import { BooksIssuedListComponent } from './books-issued-list/books-issued-list.component';
import { LoginComponent } from './login/login.component';

import { authInterceptor } from './shared/auth.interceptor';
import { spinnerInterceptor } from './shared/spinner.interceptor';

import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    HomeComponent,
    BookDetailsComponent,
    BookDetailsModalComponent,
    BooksIssueDetailsComponent,
    BooksListAtIssueModalComponent,
    BooksIssuedListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbAlertModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbCollapseModule,
    NgSelectModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',   // your JSON files path
        suffix: '.json'     // JSON extension
      }),
      defaultLanguage: 'en',
      useDefaultLang: true
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      extendedTimeOut: 1000,
      closeButton: true,
      progressBar: true,
      disableTimeOut: false
    })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        spinnerInterceptor
      ])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
