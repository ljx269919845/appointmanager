import { TestBed, inject } from '@angular/core/testing';

import { HttpHookService } from './http-hook.service';

describe('HttpHookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHookService]
    });
  });

  it('should be created', inject([HttpHookService], (service: HttpHookService) => {
    expect(service).toBeTruthy();
  }));
});
