import { TestBed } from '@angular/core/testing';

import { UserVariableService } from './user-variable.service';

describe('UserVariableService', () => {
  let service: UserVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
