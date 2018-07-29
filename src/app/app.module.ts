import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule, MatSliderModule, MatButtonModule, MatCardModule,
  MatSlideToggleModule, MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlanetViewerComponent } from './planet-viewer/planet-viewer.component';
import { OrbitSimulationComponent } from './planet-viewer/orbit-view/orbit-simulation.component';
import { PlanetInfoComponent } from './planet-viewer/planet-info/planet-info.component';
import { ExperimentSidebarComponent } from './experiment-sidebar/experiment-sidebar.component';
import {SimulationControlService} from './shared/services/simulation-control.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlanetViewerComponent,
    OrbitSimulationComponent,
    PlanetInfoComponent,
    ExperimentSidebarComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSidenavModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [
    SimulationControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
