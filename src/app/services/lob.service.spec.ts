import { TestBed, inject } from '@angular/core/testing';

import { LobService } from './lob.service';

describe('LobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LobService]
    });
  });

  it('should be created', inject([LobService], (service: LobService) => {
    expect(service).toBeTruthy();
  }));
});
