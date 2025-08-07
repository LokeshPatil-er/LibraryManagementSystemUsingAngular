import { TestBed } from '@angular/core/testing';

import { BooksIssueDetailsService } from './books-issue-details.service';

describe('BooksIssueDetailsService', () => {
  let service: BooksIssueDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksIssueDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
