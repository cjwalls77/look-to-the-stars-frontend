import {AfterViewChecked, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SimulationControlService} from '../shared/services/simulation-control.service';

@Component({
  selector: 'app-planet-viewer',
  templateUrl: './planet-viewer.component.html',
  styleUrls: ['./planet-viewer.component.scss']
})
export class PlanetViewerComponent implements OnInit, AfterViewChecked {

  private readonly DEFAULT_ORBIT_SPEED = 0.02;
  private readonly DEFAULT_ROTATION_SPEED = 0.02;

  @Output() settingsToggleChange = new EventEmitter();

  @ViewChild('simcontainer') simContainerElementRef: ElementRef;

  constructor(private simControlService: SimulationControlService) {
    this.simControlService.loadNewPlanetData();
  }

  ngOnInit() {
  }

  onResize(event) {
    this.simControlService.updateSimulationCanvasSize(this.getSimContainerWidth(), 500);
  }

  ngAfterViewChecked() {
    this.simControlService.updateSimulationCanvasSize(this.getSimContainerWidth(), 500);
  }

  getSimContainerWidth(): number {
    return this.simContainerElementRef.nativeElement.offsetWidth;
  }

  toggleSettings(): void {
    this.settingsToggleChange.emit();
  }

}
