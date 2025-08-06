import { TestBed } from '@angular/core/testing';

import { BookDetailsService } from './book-details.service';

describe('BooksAddService', () => {
  let service: BookDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
