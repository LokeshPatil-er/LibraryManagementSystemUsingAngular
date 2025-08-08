import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListAtIssueModalComponent } from './books-list-at-issue-modal.component';

describe('BooksListAtIssueModalComponent', () => {
  let component: BooksListAtIssueModalComponent;
  let fixture: ComponentFixture<BooksListAtIssueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksListAtIssueModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksListAtIssueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
