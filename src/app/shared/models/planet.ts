import * as THREE from 'three';

export class Planet {

  private _name: string;
  private _description: string;
  private _image: string;

  private _radius: number;
  private _color: number;
  private _orbitRadius: number;

  private _rotation: number;
  private _rotationSpeed: number;

  private _orbit: number;
  private _orbitSpeed: number;

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }

  get color(): number {
    return this._color;
  }

  set color(value: number) {
    this._color = value;
  }

  get orbitRadius(): number {
    return this._orbitRadius;
  }

  set orbitRadius(value: number) {
    this._orbitRadius = value;
  }

  get rotation(): number {
    return this._rotation;
  }

  set rotation(value: number) {
    this._rotation = value;
  }

  get rotationSpeed(): number {
    return this._rotationSpeed;
  }

  set rotationSpeed(value: number) {
    this._rotationSpeed = value;
  }

  get orbit(): number {
    return this._orbit;
  }

  set orbit(value: number) {
    this._orbit = value;
  }

  get orbitSpeed(): number {
    return this._orbitSpeed;
  }

  set orbitSpeed(value: number) {
    this._orbitSpeed = value;
  }

  constructor() {}

  public updateRotation() {
    this._rotation += this._rotationSpeed;
  }

  public updateOrbit() {
    this._orbit += this.orbitSpeed;
  }

}
