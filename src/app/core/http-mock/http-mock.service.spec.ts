import { TestBed, inject } from '@angular/core/testing';

import { HttpMockService } from './http-mock.service';

describe('HttpMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpMockService]
    });
  });

  it('should be created', inject([HttpMockService], (service: HttpMockService) => {
    expect(service).toBeTruthy();
  }));
});
