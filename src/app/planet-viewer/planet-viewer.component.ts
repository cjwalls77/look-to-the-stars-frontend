import {AfterViewChecked, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SimulationControlService} from '../shared/services/simulation-control.service';

@Component({
  selector: 'app-planet-viewer',
  templateUrl: './planet-viewer.component.html',
  styleUrls: ['./planet-viewer.component.scss']
})
export class PlanetViewerComponent implements OnInit, AfterViewChecked {

  @Output() settingsToggleChange = new EventEmitter();

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

  toggleSettings(): void {
    this.settingsToggleChange.emit();
  }

}
