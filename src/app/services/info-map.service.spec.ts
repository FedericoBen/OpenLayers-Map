import { TestBed } from '@angular/core/testing';

import { InfoMapService } from './info-map.service';

describe('InfoMapService', () => {
  let service: InfoMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
