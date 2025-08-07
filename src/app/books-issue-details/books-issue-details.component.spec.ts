import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksIssueDetailsComponent } from './books-issue-details.component';

describe('BooksIssueDetailsComponent', () => {
  let component: BooksIssueDetailsComponent;
  let fixture: ComponentFixture<BooksIssueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksIssueDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksIssueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
