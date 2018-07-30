import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {MatSidenavModule} from '@angular/material';
import {ExperimentSidebarComponent} from './experiment-sidebar/experiment-sidebar.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        ExperimentSidebarComponent
      ],
      imports: [
        MatSidenavModule
      ]
    }).compileComponents();
  }));
});
