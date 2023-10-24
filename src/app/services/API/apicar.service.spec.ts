import { TestBed } from '@angular/core/testing';

import { ApicarService } from './apicar.service';

describe('ApicarService', () => {
  let service: ApicarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
