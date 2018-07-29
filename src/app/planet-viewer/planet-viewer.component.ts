import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SimulationControlService} from '../shared/services/simulation-control.service';

@Component({
  selector: 'app-planet-viewer',
  templateUrl: './planet-viewer.component.html',
  styleUrls: ['./planet-viewer.component.scss']
})
export class PlanetViewerComponent implements OnInit, AfterViewChecked {

  @ViewChild('simcontainer') simContainerElementRef: ElementRef;

  private _simControlService: SimulationControlService;

  constructor(private simControlService: SimulationControlService) {
    this._simControlService = simControlService;
  }

  ngOnInit() {
  }

  onResize(event) {
    this._simControlService.updateSimulationCanvasSize(this.getSimContainerWidth(), 500);
  }

  ngAfterViewChecked() {
    this._simControlService.updateSimulationCanvasSize(this.getSimContainerWidth(), 500);
  }

  getSimContainerWidth(): number {
    return this.simContainerElementRef.nativeElement.offsetWidth;
  }

}
