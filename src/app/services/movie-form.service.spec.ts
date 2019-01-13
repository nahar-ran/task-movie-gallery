import { TestBed } from '@angular/core/testing';

import { MovieFormService } from './movie-form.service';

describe('MovieFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieFormService = TestBed.get(MovieFormService);
    expect(service).toBeTruthy();
  });
});
