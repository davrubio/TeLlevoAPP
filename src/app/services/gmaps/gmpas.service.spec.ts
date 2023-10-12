import { TestBed } from '@angular/core/testing';

import { GmpasService } from './gmpas.service';

describe('GmpasService', () => {
  let service: GmpasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GmpasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
