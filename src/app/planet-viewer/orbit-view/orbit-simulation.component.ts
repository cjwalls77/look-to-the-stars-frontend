import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import { Planet } from '../../shared/models/planet';
import {SimulationControlService} from '../../shared/services/simulation-control.service';
import {SimulationCanvasSize} from '../../shared/models/simulation-canvas-size';

@Component({
  selector: 'app-orbit-view',
  templateUrl: './orbit-simulation.component.html',
  styleUrls: ['./orbit-simulation.component.scss']
})
export class OrbitSimulationComponent implements OnInit {


  private readonly height = 500;
  private width = 500;

  private _simControlService: SimulationControlService;

  @ViewChild('simulation') private elementRef: ElementRef;
  private container: HTMLElement;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private sun: THREE.Mesh;
  private planetData: Planet;
  private planetObject: THREE.Object3D;
  private orbitRing: THREE.Line;

  constructor(private simControlService: SimulationControlService) {
    this._simControlService = simControlService;
    this.getPlanetData();
    this._simControlService.simulationCanvasSizeChanged.subscribe((canvasSize: SimulationCanvasSize) => {
      if (this.renderer != null && this.camera != null) {
        this.renderer.setSize(canvasSize.width, canvasSize.height);
        this.camera.aspect = canvasSize.width / canvasSize.height;
        this.camera.updateProjectionMatrix();
      }
    });
  }

  private getPlanetData() {
    this.planetData = new Planet();
    this.planetData.radius = 20;
    this.planetData.color = 0x92b1ff;
    this.planetData.orbitRadius = 200;
    this.planetData.orbitSpeed = .005;
    this.planetData.orbit = 1;
    this.planetData.rotationSpeed = 0.005;
    this.planetData.rotation = 1;
  }

  ngOnInit() {
    this.container = this.elementRef.nativeElement;
    this.init();
  }

  init(): void {
    const bgColor = 0x2f0049;
    // Set-up Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(bgColor);
    // Set-up Renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // Set-up Camera
    const view: any = {
      angle: 45,
      aspect: this.width / this.height,
      near: 0.1,
      far: 10000
    };
    this.camera = new THREE.PerspectiveCamera(view.angle, view.aspect, view.near, view.far);
    this.camera.position.set(0, 100, 400);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    // Start the Renderer
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);

    this.createSun();

    this.createPlanet();
    this.createLighting();

    this.render();
  }

  createSun(): void {
    // Set up the sun vars
    const RADIUS = 50;
    const SEGMENTS = 20;
    const RINGS = 20;

    this.sun = new THREE.Mesh(
      new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),
      new THREE.MeshBasicMaterial(
        {
          color: 0xed8125
        }
      )
    );
    this.sun.castShadow = false;

    this.scene.add(this.sun);
  }

  createPlanet(): void {

    // Mesh detail settings
    const SEGMENTS = 20;
    const RINGS = 20;
    const ORBIT_LINE_SEGMENTS = 90;

     const planetGeometry = new THREE.Mesh(
      new THREE.SphereGeometry(
        this.planetData.radius,
        SEGMENTS,
        RINGS),
      new THREE.MeshLambertMaterial(
        {
          color: this.planetData.color
        }
      )
    );

    this.planetObject = new THREE.Object3D();
    this.planetObject.add(planetGeometry);

    this.planetObject.position.set(this.planetData.orbit, 0, 0);

    this.scene.add(this.planetObject);

    this.orbitRing = new THREE.Line(
      new THREE.CircleGeometry(this.planetData.orbitRadius, 90),
      new THREE.LineBasicMaterial()
    );
    // orbit.geometry.vertices.shift();
    this.orbitRing.rotation.x = THREE.Math.degToRad(90);
    this.orbitRing.rotation.z = THREE.Math.degToRad(270);
    this.scene.add(this.orbitRing);
  }

  createLighting(): void {
    // create a point light
    const pointLight =
      new THREE.PointLight(0xFFFFFF, 1, 0, 0);
    pointLight.position.set(0, 0, 0);

    this.scene.add(pointLight);

    const ambientlight = new THREE.AmbientLight(0x090909);
    this.scene.add(ambientlight);
  }

  render(): void {
    const self: OrbitSimulationComponent = this;

    (function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);

      self.animate();
    }());

  }
  animate(): void {

    this.planetData.updateRotation();
    this.planetObject.rotation.set(0, this.planetData.rotation, 0);
    this.planetData.updateOrbit();
    this.planetObject.position.set(Math.cos(this.planetData.orbit) * this.planetData.orbitRadius, 0, Math.sin(this.planetData.orbit) * this.planetData.orbitRadius);
  }


}
