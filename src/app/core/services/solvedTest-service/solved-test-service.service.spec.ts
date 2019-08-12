import { TestBed } from '@angular/core/testing';

import { SolvedTestServiceService } from './solved-test-service.service';

describe('SolvedTestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolvedTestServiceService = TestBed.get(SolvedTestServiceService);
    expect(service).toBeTruthy();
  });
});
