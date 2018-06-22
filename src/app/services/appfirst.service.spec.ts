import { TestBed, inject } from '@angular/core/testing';

import { AppfirstService } from './appfirst.service';

describe('AppfirstService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppfirstService]
    });
  });

  it('should be created', inject([AppfirstService], (service: AppfirstService) => {
    expect(service).toBeTruthy();
  }));
});
