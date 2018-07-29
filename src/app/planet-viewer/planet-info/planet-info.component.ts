import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent implements OnInit {

  private _planetName: string;
  private _planetDescription: string;

  get planetName(): string {
    return this._planetName;
  }

  get planetDescription(): string {
    return this._planetDescription;
  }

  constructor() {
    this._planetName = 'Earth';
    this._planetDescription = 'This is where we come from...';
  }

  ngOnInit() {
  }

}
