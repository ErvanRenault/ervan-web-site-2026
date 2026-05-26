import { TestBed } from '@angular/core/testing';

import { FirestoreRepositoryService } from './firestore-repository.service';

describe('FirestoreRepository', () => {
  let service: FirestoreRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
