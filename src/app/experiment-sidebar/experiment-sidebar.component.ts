import { Component, OnInit } from '@angular/core';
import {SimulationControlService} from '../shared/services/simulation-control.service';
import {MatSliderChange, MatSlideToggleChange} from '@angular/material';

@Component({
  selector: 'app-experiment-sidebar',
  templateUrl: './experiment-sidebar.component.html',
  styleUrls: ['./experiment-sidebar.component.scss']
})
export class ExperimentSidebarComponent implements OnInit {

  private _simControlService: SimulationControlService;

  constructor(private simControlService: SimulationControlService) {
    this._simControlService = simControlService;
  }

  ngOnInit() {
  }

  changeOrbitSpeed(change: MatSliderChange) {
    this._simControlService.changePlanetOrbitSpeed(change.value);
  }

  changeRotationSpeed(change: MatSliderChange) {
    this._simControlService.changePlanetRotationSpeed(change.value);
  }

  changeIsOrbiting(change: MatSlideToggleChange) {
    if (change.checked === true) {
      this._simControlService.startOrbiting();
    } else {
      this._simControlService.stopOrbiting();
    }
  }

}
