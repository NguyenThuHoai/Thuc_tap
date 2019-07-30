import { TestBed, async, inject } from '@angular/core/testing';

import { AuthAdGuard } from './auth.guard';

describe('AuthAdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthAdGuard]
    });
  });

  it('should ...', inject([AuthAdGuard], (guard: AuthAdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
