import { PlanetDao} from './api/planet-dao';

export class Planet implements PlanetDao{

  private _id: number;
  private _name: string;
  private _description: string;
  private _image: string;

  private _radius: number;
  private _color: string;
  private _orbitRadius: number;

  private _rotation: number;
  private _rotationSpeed: number;

  private _orbit: number;
  private _orbitSpeed: number;

  constructor() {
    this._rotation = 0;
    this._orbit = 0;

    // FIXME: Load these from control service
    this._rotationSpeed = 0.005;
    this._orbitSpeed = 0.005;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
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

  public updateFromDao(dao: PlanetDao) {
    this._id = dao.id;
    this._name = dao.name;
    this._description = dao.description;
    this._image = dao.image;
    this._radius = dao.radius;
    this._color = dao.color;
    this.orbitRadius = dao.orbitRadius;
  }

  public updateRotation() {
    this._rotation += this._rotationSpeed;
  }

  public updateOrbit() {
    this._orbit += this.orbitSpeed;
  }
}
