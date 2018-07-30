import {EventEmitter, Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import {Planet} from '../models/planet';
import {SimulationCanvasSize} from '../models/simulation-canvas-size';
import {PlanetDataApiService} from './planet-data-api.service';
import {RestResponse} from '../models/api/rest-response';

@Injectable({
  providedIn: 'root'
})
export class SimulationControlService {

  private _planetOrbitSpeedChange = new EventEmitter<number>();
  private _planetRotationSpeedChange = new EventEmitter<number>();
  private _planetDataChange = new EventEmitter<Planet>();
  private _isOrbiting = new EventEmitter<boolean>();
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

  get isOrbiting(): EventEmitter<boolean> {
    return this._isOrbiting;
  }

  get simulationCanvasSizeChanged(): EventEmitter<SimulationCanvasSize> {
    return this._simulationCanvasSizeChanged;
  }

  constructor(private dataApiService: PlanetDataApiService) { }

  public loadNewPlanetData() {
    this.dataApiService.getRandomPlanet().subscribe(
      (res: RestResponse) => {
        this._planetDataChange.next(res.data);
    },
      (error) => console.log(error));
  }

  public updateSimulationCanvasSize(width: number, height: number): void {
    const canvasSize = new SimulationCanvasSize(width, height);
    this.simulationCanvasSizeChanged.emit(canvasSize);
  }

  public startOrbiting() {
    this._isOrbiting.emit(true);
  }

  public stopOrbiting() {
    this._isOrbiting.emit(false);
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
