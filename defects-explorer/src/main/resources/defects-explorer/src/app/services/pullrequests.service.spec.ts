import { TestBed } from '@angular/core/testing';

import { PullrequestsService } from './pullrequests.service';

describe('PullrequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PullrequestsService = TestBed.get(PullrequestsService);
    expect(service).toBeTruthy();
  });
});
