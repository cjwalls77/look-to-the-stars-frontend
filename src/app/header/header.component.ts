import { Component, OnInit } from '@angular/core';
import {SimulationControlService} from '../shared/services/simulation-control.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _simControlService: SimulationControlService;

  constructor(private simControlService: SimulationControlService) {
    this._simControlService = simControlService;
  }

  ngOnInit() {
  }

  public changePlanet() {
    this._simControlService.loadNewPlanetData();
  }

}
