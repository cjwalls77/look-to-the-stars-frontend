import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule, MatSliderModule, MatButtonModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlanetViewerComponent } from './planet-viewer/planet-viewer.component';
import { OrbitViewComponent } from './planet-viewer/orbit-view/orbit-view.component';
import { PlanetInfoComponent } from './planet-viewer/planet-info/planet-info.component';
import { ExperimentSidebarComponent } from './experiment-sidebar/experiment-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlanetViewerComponent,
    OrbitViewComponent,
    PlanetInfoComponent,
    ExperimentSidebarComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
