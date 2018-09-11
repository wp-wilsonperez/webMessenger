import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenticactionGuard } from './authenticaction.guard';

describe('AuthenticactionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticactionGuard]
    });
  });

  it('should ...', inject([AuthenticactionGuard], (guard: AuthenticactionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
