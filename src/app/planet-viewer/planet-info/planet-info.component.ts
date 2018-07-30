import { Component, OnInit } from '@angular/core';
import {SimulationControlService} from '../../shared/services/simulation-control.service';
import {PlanetDao} from '../../shared/models/api/planet-dao';

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

  constructor(private simControlService: SimulationControlService) {
    this.simControlService.planetDataChange.subscribe((data: PlanetDao) => {
      this._planetName = data.name;
      this._planetDescription = data.description;
    });
  }

  ngOnInit() {
  }

}
