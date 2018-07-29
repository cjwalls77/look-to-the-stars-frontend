import {EventEmitter, Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import {Planet} from '../models/planet';
import {SimulationCanvasSize} from '../models/simulation-canvas-size';

@Injectable({
  providedIn: 'root'
})
export class SimulationControlService {

  private _planetOrbitSpeedChange = new EventEmitter<number>();
  private _planetRotationSpeedChange = new EventEmitter<number>();
  private _planetDataChange = new EventEmitter<Planet>();
  private _simulationCanvasSizeChanged = new EventEmitter<SimulationCanvasSize>();

  get planetOrbitSpeedChange(): EventEmitter<number> {
    return this._planetOrbitSpeedChange;
  }

  get planetRotationSpeedChange(): EventEmitter<number> {
    return this._planetRotationSpeedChange;
  }

  get planetDataChange(): EventEmitter<Planet> {
    return this._planetDataChange;
  }

  get simulationCanvasSizeChanged(): EventEmitter<SimulationCanvasSize> {
    return this._simulationCanvasSizeChanged;
  }

  constructor() { }

  public changePlanet() {
    const data = new Planet();
    data.radius = 10;
    data.color = 0x92b1ff;
    data.orbitRadius = 100;
    data.orbitSpeed = .005;
    data.orbit = 1;
    data.rotationSpeed = 0.005;
    data.rotation = 1;

    this._planetDataChange.next(data);
  }

  public updateSimulationCanvasSize(width: number, height: number): void {
    const canvasSize = new SimulationCanvasSize(width, height);
    this.simulationCanvasSizeChanged.emit(canvasSize);
  }

  public changePlanetOrbitSpeed(days: number) {
    // TODO: Determine formula to translate days to animation speed for orbit
    this._planetOrbitSpeedChange.emit(days);
  }

  public changePlanetRotationSpeed(hours: number) {
    // TODO: Determine formula to translate hours to animation speed for rotation
    this._planetRotationSpeedChange.emit(hours);
  }
}
