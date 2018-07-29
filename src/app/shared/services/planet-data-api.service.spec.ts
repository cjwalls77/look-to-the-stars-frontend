import { TestBed, inject } from '@angular/core/testing';

import { PlanetDataApiService } from './planet-data-api.service';

describe('PlanetDataApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanetDataApiService]
    });
  });

  it('should be created', inject([PlanetDataApiService], (service: PlanetDataApiService) => {
    expect(service).toBeTruthy();
  }));
});
