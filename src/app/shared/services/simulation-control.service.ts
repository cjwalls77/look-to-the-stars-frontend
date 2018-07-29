import {EventEmitter, Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import {Planet} from '../models/planet';
import {SimulationCanvasSize} from '../models/simulation-canvas-size';

@Injectable({
  providedIn: 'root'
})
export class SimulationControlService {

  private _planetDataChanged = new EventEmitter<Planet>();
  private _simulationCanvasSizeChanged = new EventEmitter<SimulationCanvasSize>()

  get planetDataChanged(): EventEmitter<Planet> {
    return this._planetDataChanged;
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

    this._planetDataChanged.next(data);
  }

  public updateSimulationCanvasSize(width: number, height: number): void {
    let canvasSize = new SimulationCanvasSize(width, height);
    this.simulationCanvasSizeChanged.emit(canvasSize);
  }
}
