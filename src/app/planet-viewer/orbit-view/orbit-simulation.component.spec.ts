import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitSimulationComponent } from './orbit-simulation.component';

describe('OrbitSimulationComponent', () => {
  let component: OrbitSimulationComponent;
  let fixture: ComponentFixture<OrbitSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrbitSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrbitSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
