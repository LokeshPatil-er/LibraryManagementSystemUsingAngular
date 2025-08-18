import { TestBed } from '@angular/core/testing';

import { BooksIssuedListService } from './books-issued-list.service';

describe('BooksIssuedListService', () => {
  let service: BooksIssuedListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksIssuedListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
