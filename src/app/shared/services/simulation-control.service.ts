import {EventEmitter, Injectable} from '@angular/core';
import {Planet} from '../models/planet';
import {SimulationCanvasSize} from '../models/simulation-canvas-size';
import {PlanetDataApiService} from './planet-data-api.service';
import {RestResponse} from '../models/api/rest-response';

@Injectable({
  providedIn: 'root'
})
export class SimulationControlService {

  private _currentOrbitSpeed = 0.05;
  private _currentRotationSpeed = 0.05;
  private _currentPlanetId = null;

  // Event Emitters
  private _planetOrbitSpeedChange = new EventEmitter<number>();
  private _planetRotationSpeedChange = new EventEmitter<number>();
  private _planetDataChange = new EventEmitter<Planet>();
  private _isOrbiting = new EventEmitter<boolean>();
  private _simulationCanvasSizeChanged = new EventEmitter<SimulationCanvasSize>();


  get currentOrbitSpeed(): number {
    return this._currentOrbitSpeed;
  }

  get currentRotationSpeed(): number {
    return this._currentRotationSpeed;
  }

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

  /**
   * Load new planet data from REST API.
   */
  public loadNewPlanetData() {
    this.dataApiService.getRandomPlanet().subscribe(
      (res: RestResponse) => {
        // Request a new random planet, if the planet is the same as the current planet request a new one from api
        if (this._currentPlanetId == null && this._currentPlanetId !== res.data.id) {
          this._planetDataChange.next(res.data);
        } else {
          this.loadNewPlanetData();
        }
    },
      (error) => console.log(error));
  }

  /**
   * Update simulation canvas based on new container size.
   * @param width New width of container.
   * @param height New height of container.
   */
  public updateSimulationCanvasSize(width: number, height: number): void {
    const canvasSize = new SimulationCanvasSize(width, height);
    this.simulationCanvasSizeChanged.emit(canvasSize);
  }

  /**
   * Emit event to starting planet orbiting for simulation.
   */
  public startOrbiting() {
    this._isOrbiting.emit(true);
  }

  /**
   * Emit event to stop planet orbiting for simulation.
   */
  public stopOrbiting() {
    this._isOrbiting.emit(false);
  }

  /**
   * Emit event to change planet orbit speed;
   * @param speed Orbit speed.
   */
  public changePlanetOrbitSpeed(speed: number) {
    this._currentOrbitSpeed = speed;
    this._planetOrbitSpeedChange.emit(speed);
  }

  /**
   * Emit event to change planet axis rotation speed.
   * @param speed Rotation speed
   */
  public changePlanetRotationSpeed(speed: number) {
    this._currentRotationSpeed = speed;
    this._planetRotationSpeedChange.emit(speed);
  }
}
