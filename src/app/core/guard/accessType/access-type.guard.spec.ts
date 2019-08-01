import { TestBed, async, inject } from '@angular/core/testing';

import { AccessTypeGuard } from './access-type.guard';

describe('AccessTypeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessTypeGuard]
    });
  });

  it('should ...', inject([AccessTypeGuard], (guard: AccessTypeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
