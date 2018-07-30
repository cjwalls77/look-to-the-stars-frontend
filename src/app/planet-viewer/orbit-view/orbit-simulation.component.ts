import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import { Planet } from '../../shared/models/planet';
import {SimulationControlService} from '../../shared/services/simulation-control.service';
import {SimulationCanvasSize} from '../../shared/models/simulation-canvas-size';
import {PlanetDao} from '../../shared/models/api/planet-dao';
import {sp} from '@angular/core/src/render3';

@Component({
  selector: 'app-orbit-view',
  templateUrl: './orbit-simulation.component.html',
  styleUrls: ['./orbit-simulation.component.scss']
})
export class OrbitSimulationComponent implements OnInit {

  // Geo Constants
  private static readonly PLANET_GEO_DETAIL = 1;
  private static readonly ORBIT_RING_SEGMENTS = 90;
  private static readonly ORBIT_RING_ROTATION_X = 90;
  private static readonly ORBIT_RING_ROTATION_Y = 270;
  private static readonly SUN_RADIUS = 50;
  private static readonly SUN_SEGMENTS = 20;
  private static readonly SUN_RINGS = 20;
  private static readonly SUN_COLOR = 0xed8125;

  // Canvas Constants
  private static readonly DEFAULT_SIMULATION_CANVAS_SIZE = new SimulationCanvasSize(500, 450);
  private static readonly CANVAS_BG_COLOR = 0x2f0049;

  // Camera Constants
  private static readonly DEFAULT_CAMERA_VIEW = {
    angle: 45,
    aspect: OrbitSimulationComponent.DEFAULT_SIMULATION_CANVAS_SIZE.width / OrbitSimulationComponent.DEFAULT_SIMULATION_CANVAS_SIZE.height,
    near: 0.1,
    far: 10000
  };
  private static readonly DEFAULT_CAMERA_POSITION = {x: 0, y: 100, z: 500};
  private static readonly DEFAULT_CAMERA_LOOK_AT_LOCATION = {x: 0, y: 0, z: 0};

  // Lighting Constants
  private static readonly DEFAULT_POINT_LIGHT_SETTINGS = {
    color: 0xFFFFFF,
    intensity: 1,
    distance: 0,
    decay: 0};
  private static readonly DEFAULT_POINT_LIGHT_POSITION = { x: 0, y: 0, z: 0};
  private static readonly DEFAULT_AMBIENT_LIGHT_COLOR = 0x090909;

  // Canvas Container
  @ViewChild('simulation') private elementRef: ElementRef;
  private container: HTMLElement;

  // Scene, Camera, Renderer for Simulation
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  // Scene Objects
  private sun: THREE.Mesh;
  private planetData: Planet = new Planet();
  private planetGeo: THREE.Mesh;
  private planetObject: THREE.Object3D;
  private orbitRing: THREE.Line;

  // Flag to start/stop orbit animation
  private isOrbiting = true;
  private needsOrbitPosRender = false;

  /**
   * Generate three.js planet geometry from planet data.
   * @param data Planet data to generate geometry from.
   */
  private static generatePlanetGeo(data: PlanetDao) {
    return new THREE.Mesh(
      new THREE.IcosahedronGeometry(
        data.radius,
        OrbitSimulationComponent.PLANET_GEO_DETAIL
        ),
      new THREE.MeshLambertMaterial(
        {
          color: new THREE.Color(data.color)
        }
      )
    );
  }

  /**
   * Generate planet orbit ring mesh from planet data.
   * @param data Planet data to generate orbit ring from.
   */
  private static generateOrbitRing(data: PlanetDao): THREE.Line {
    const orbitRing = new THREE.Line(
      new THREE.CircleGeometry(data.orbitRadius, OrbitSimulationComponent.ORBIT_RING_SEGMENTS),
      new THREE.LineBasicMaterial()
    );
    // orbit.geometry.vertices.shift();
    orbitRing.rotation.x = THREE.Math.degToRad(OrbitSimulationComponent.ORBIT_RING_ROTATION_X);
    orbitRing.rotation.z = THREE.Math.degToRad(OrbitSimulationComponent.ORBIT_RING_ROTATION_Y);
    return orbitRing;
  }

  constructor(private simControlService: SimulationControlService) {
    this.subscribeToSimulationControlChanges();
    this.planetData.orbitSpeed = this.simControlService.currentOrbitSpeed;
    this.planetData.rotationSpeed = this.simControlService.currentRotationSpeed;
  }

  /**
   * Subscribe to simulation control service changes to update simulation from control changes.
   */
  private subscribeToSimulationControlChanges() {
    // Responsive Canvas Size Change Event
    this.simControlService.simulationCanvasSizeChanged.subscribe((canvasSize: SimulationCanvasSize) => {
      if (this.renderer != null && this.camera != null) { // Do not attempt to update simulation canvas if not set-up
        // Only update canvas width, keep height static
        this.renderer.setSize(canvasSize.width, OrbitSimulationComponent.DEFAULT_SIMULATION_CANVAS_SIZE.height);
        this.camera.aspect = canvasSize.width / OrbitSimulationComponent.DEFAULT_SIMULATION_CANVAS_SIZE.height;
        this.camera.updateProjectionMatrix();
      }
    });

    // Planet Change Event
    this.simControlService.planetDataChange.subscribe((data: Planet) => {
      this.updatePlanet(data);
      this.needsOrbitPosRender = true;
    });

    // Orbit Speed Change Event
    this.simControlService.planetOrbitSpeedChange.subscribe((speed: number) => {
      this.planetData.orbitSpeed = speed;
    });

    // Planet Axis Rotation Speed Change Event
    this.simControlService.planetRotationSpeedChange.subscribe((speed: number) => {
      this.planetData.rotationSpeed = speed;
    });

    // Start/Stop Orbiting Animation Change Event
    this.simControlService.isOrbiting.subscribe((isOrbiting: boolean) => {
      this.isOrbiting = isOrbiting;
    });
  }

  ngOnInit() {
    this.container = this.elementRef.nativeElement;
    this.init();
  }

  /**
   * Initialize 3D simulation of planet orbit.
   */
  private init(): void {

    // Set-up Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(OrbitSimulationComponent.CANVAS_BG_COLOR);

    // Set-up Renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Set-up Camera
    this.camera = new THREE.PerspectiveCamera(OrbitSimulationComponent.DEFAULT_CAMERA_VIEW.angle,
      OrbitSimulationComponent.DEFAULT_CAMERA_VIEW.aspect,
      OrbitSimulationComponent.DEFAULT_CAMERA_VIEW.near,
      OrbitSimulationComponent.DEFAULT_CAMERA_VIEW.far);

    this.camera.position.set(OrbitSimulationComponent.DEFAULT_CAMERA_POSITION.x,
      OrbitSimulationComponent.DEFAULT_CAMERA_POSITION.y,
      OrbitSimulationComponent.DEFAULT_CAMERA_POSITION.z);

    this.camera.lookAt(
      OrbitSimulationComponent.DEFAULT_CAMERA_LOOK_AT_LOCATION.x,
      OrbitSimulationComponent.DEFAULT_CAMERA_LOOK_AT_LOCATION.y,
      OrbitSimulationComponent.DEFAULT_CAMERA_LOOK_AT_LOCATION.z);

    this.scene.add(this.camera);

    // Set-up Renderer
    this.renderer.setSize(OrbitSimulationComponent.DEFAULT_SIMULATION_CANVAS_SIZE.width,
      OrbitSimulationComponent.DEFAULT_SIMULATION_CANVAS_SIZE.height);

    this.container.appendChild(this.renderer.domElement);

    // Generate Scene Objects
    this.createSun();
    this.createPlanet();
    this.createLighting();

    // Start Simulation Rendering
    this.render();
  }

  /**
   * Create sun mesh/material and add to scene.
   */
  private createSun(): void {
    this.sun = new THREE.Mesh(
      new THREE.SphereGeometry(
        OrbitSimulationComponent.SUN_RADIUS,
        OrbitSimulationComponent.SUN_SEGMENTS,
        OrbitSimulationComponent.SUN_RINGS),
      new THREE.MeshBasicMaterial(
        {
          color: OrbitSimulationComponent.SUN_COLOR
        }
      )
    );
    this.sun.castShadow = false;

    this.scene.add(this.sun);
  }

  /**
   * Create planet and orbit ring mesh/material and add to scene.
   */
  private createPlanet(): void {
     this.planetGeo = OrbitSimulationComponent.generatePlanetGeo(this.planetData);

    this.planetObject = new THREE.Object3D();
    this.planetObject.add(this.planetGeo);

    this.planetObject.position.set(this.planetData.orbit, 0, 0);

    this.scene.add(this.planetObject);

    this.orbitRing = OrbitSimulationComponent.generateOrbitRing(this.planetData);
    this.scene.add(this.orbitRing);
  }

  /**
   * Update planet mesh/material from new planet data.
   * @param newPlanetData New planet data to update mesh/material
   */
  private updatePlanet(newPlanetData: PlanetDao) {
    // Update Planet 3D Object Rendering
    this.planetObject.remove(this.planetGeo);
    this.planetGeo = OrbitSimulationComponent.generatePlanetGeo(newPlanetData);
    this.planetObject.add(this.planetGeo);

    // Update Planet Orbit Ring Rendering
    this.scene.remove(this.orbitRing);
    this.orbitRing = OrbitSimulationComponent.generateOrbitRing(newPlanetData);
    this.scene.add(this.orbitRing);

    // Update Planet Data for Animation
    this.planetData.updateFromDao(newPlanetData);
  }

  /**
   * Create default lighting set-up for scene.
   */
  private createLighting(): void {
    // Set-up Point Light
    const pointLight =
      new THREE.PointLight(
        OrbitSimulationComponent.DEFAULT_POINT_LIGHT_SETTINGS.color,
        OrbitSimulationComponent.DEFAULT_POINT_LIGHT_SETTINGS.intensity,
        OrbitSimulationComponent.DEFAULT_POINT_LIGHT_SETTINGS.distance,
        OrbitSimulationComponent.DEFAULT_POINT_LIGHT_SETTINGS.decay);

    pointLight.position.set(
      OrbitSimulationComponent.DEFAULT_POINT_LIGHT_POSITION.x,
      OrbitSimulationComponent.DEFAULT_POINT_LIGHT_POSITION.y,
      OrbitSimulationComponent.DEFAULT_POINT_LIGHT_POSITION.z);

    this.scene.add(pointLight);

    // Set-up Ambient Light
    const ambientLight = new THREE.AmbientLight(OrbitSimulationComponent.DEFAULT_AMBIENT_LIGHT_COLOR);
    this.scene.add(ambientLight);
  }

  /**
   * Render loop for planet orbit simulation.
   */
  private render() {
    const self: OrbitSimulationComponent = this;

    (function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);

      self.animate();
    }());

  }

  /**
   * Animation steps for rendering each frame in render loop.
   */
  private animate() {
    // Update Planet Rotation
    this.planetData.updateRotation();
    this.planetObject.rotation.set(0, this.planetData.rotation, 0);

    // Update Planet Orbit Position
    if (this.isOrbiting) { // Don't update planet if orbiting paused
      this.planetData.updateOrbit();
      this.planetObject.position.set(
        Math.cos(this.planetData.orbit) * this.planetData.orbitRadius,
        0,
        Math.sin(this.planetData.orbit) * this.planetData.orbitRadius
      );
    } else if (this.needsOrbitPosRender) {
      // Render same orbit location but with new planet orbit radius
      this.planetObject.position.set(
        Math.cos(this.planetData.orbit) * this.planetData.orbitRadius,
        0,
        Math.sin(this.planetData.orbit) * this.planetData.orbitRadius
      );
    }
  }


}
