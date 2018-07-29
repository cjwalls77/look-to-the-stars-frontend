import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-orbit-view',
  templateUrl: './orbit-view.component.html',
  styleUrls: ['./orbit-view.component.scss']
})
export class OrbitViewComponent implements OnInit {

  readonly screen: any = {
    width: 1000,
    height: 500
  };
  readonly view: any = {
    angle: 45,
    aspect: this.screen.width / this.screen.height,
    near: 0.1,
    far: 10000
  };

  @ViewChild('simulation') elementRef: ElementRef;
  container: HTMLElement;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: THREE.OrbitControls;
  renderer: THREE.WebGLRenderer;

  sun: THREE.Mesh;
  planet: THREE.Object3D;
  planetTrackingInfo: any = {};

  constructor() {
    console.log(THREE);

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
    this.camera = new THREE.PerspectiveCamera(this.view.angle, this.view.aspect, this.view.near, this.view.far);
    this.camera.position.set(0, 100, 400);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    // Start the Renderer
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.container.appendChild(this.renderer.domElement);

    this.createSun();

    this.createPlanet();
    this.createLighting();

    this.animate();
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
    // Set up the sun vars
    const ORBIT = 100;
    const RADIUS = 10;
    const SEGMENTS = 20;
    const RINGS = 20;

    const planetGeom = new THREE.Mesh(
      new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),
      new THREE.MeshLambertMaterial(
        {
          color: 0x92b1ff
        }
      )
    );

    this.planet = new THREE.Object3D();
    this.planet.add(planetGeom);

    this.planet.position.set(ORBIT, 0, 0);

    this.scene.add(this.planet);

    this.planetTrackingInfo.orbitRadius = ORBIT;
    this.planetTrackingInfo.rot = 20;
    this.planetTrackingInfo.rotSpeed = 0.005;
    this.planetTrackingInfo.orbit = 1;
    this.planetTrackingInfo.orbitSpeed = .1;

    const orbit = new THREE.Line(
      new THREE.CircleGeometry(this.planetTrackingInfo.orbitRadius, 90),
      new THREE.LineBasicMaterial()
    );
    orbit.geometry.vertices.shift();
    orbit.rotation.x = THREE.Math.degToRad(90);
    orbit.rotation.z = THREE.Math.degToRad(270);
    this.scene.add(orbit);

    this.render();

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
    let self: OrbitViewComponent = this;

    (function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);

      self.animate();
    }());

  }
  animate(): void {

    this.planetTrackingInfo.rot += this.planetTrackingInfo.rotSpeed;
    this.planet.rotation.set(0, this.planetTrackingInfo.rot, 0);
    this.planetTrackingInfo.orbit += this.planetTrackingInfo.orbitSpeed;
    this.planet.position.set(Math.cos(this.planetTrackingInfo.orbit) * this.planetTrackingInfo.orbitRadius, 0, Math.sin(this.planetTrackingInfo.orbit) * this.planetTrackingInfo.orbitRadius);
  }


}
