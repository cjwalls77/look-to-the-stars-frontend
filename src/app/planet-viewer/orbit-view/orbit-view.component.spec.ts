import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitViewComponent } from './orbit-view.component';

describe('OrbitViewComponent', () => {
  let component: OrbitViewComponent;
  let fixture: ComponentFixture<OrbitViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrbitViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrbitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
