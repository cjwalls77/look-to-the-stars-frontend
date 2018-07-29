import { TestBed, inject } from '@angular/core/testing';

import { SimulationControlService } from './simulation-control.service';

describe('SimulationControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimulationControlService]
    });
  });

  it('should be created', inject([SimulationControlService], (service: SimulationControlService) => {
    expect(service).toBeTruthy();
  }));
});
