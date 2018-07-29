import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentSidebarComponent } from './experiment-sidebar.component';

describe('ExperimentSidebarComponent', () => {
  let component: ExperimentSidebarComponent;
  let fixture: ComponentFixture<ExperimentSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
