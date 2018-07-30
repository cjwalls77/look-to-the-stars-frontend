import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimulationControlService} from '../shared/services/simulation-control.service';
import {MatSliderChange, MatSlideToggleChange} from '@angular/material';

@Component({
  selector: 'app-experiment-sidebar',
  templateUrl: './experiment-sidebar.component.html',
  styleUrls: ['./experiment-sidebar.component.scss']
})
export class ExperimentSidebarComponent implements OnInit, AfterViewInit {

  @Output() close = new EventEmitter();

  // Orbit Speed Slider Config
  public orbitSpeedMinValue = .001;
  public orbitSpeedMaxValue = .1;
  public orbitSpeedStep = .001;
  public orbitSpeedValue = .005;

  // Rotation Speed Slider Config
  public rotationSpeedMinValue = .001;
  public rotationSpeedMaxValue = .1;
  public rotationSpeedStep = .001;
  public rotationSpeedValue = .05;

  constructor(private simControlService: SimulationControlService) {
    this.orbitSpeedValue = this.simControlService.currentOrbitSpeed;
    this.rotationSpeedValue = this.simControlService.currentRotationSpeed;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  closeSideBar() {
    this.close.emit();
  }

  /**
   * Change orbit speed of planet in simulation.
   * @param change New orbit speed value.
   */
  changeOrbitSpeed(change: MatSliderChange) {
    this.orbitSpeedValue = change.value;
    this.simControlService.changePlanetOrbitSpeed(change.value);
  }

  /**
   * Change rotation speed of planet in simulation.
   * @param change New rotation speed value.
   */
  changeRotationSpeed(change: MatSliderChange) {
    this.rotationSpeedValue = change.value;
    this.simControlService.changePlanetRotationSpeed(change.value);
  }

  /**
   * Turn planet orbiting on/off.
   * @param change New toggle value for orbiting  on/off.
   */
  changeIsOrbiting(change: MatSlideToggleChange) {
    if (change.checked === true) {
      this.simControlService.startOrbiting();
    } else {
      this.simControlService.stopOrbiting();
    }
  }

}
