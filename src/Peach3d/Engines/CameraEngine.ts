import { Vector3, Camera, PerspectiveCamera, OrbitControls } from "three-full";
import { IRenderEvents } from "../Contracts";
import { LayerType, EventType } from '../Enums';

export class CameraEngine implements IRenderEvents {
  private _Camera: Camera;
  private _Canvas: HTMLElement;

  private _OrbitControl: OrbitControls;

  public get Canvas(): HTMLElement {
    return this._Canvas;
  }

  public set Canvas(canvas: HTMLElement) {
    if (!canvas) return;

    this._Camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this._Camera.updateProjectionMatrix();

    this._OrbitControl = new OrbitControls(this._Camera, canvas);
    this._ConfigureControls();
  }

  public get Camera(): Camera {
    return this._Camera;
  }

  public get Controls(): OrbitControls {
    return this._OrbitControl;
  }

  constructor() {
    this._Camera = new PerspectiveCamera();
    this._Camera.up.set(0,0,1); // This changes the Axis so that Z is UP
    this._Camera.layers.enable(LayerType.HeatBed);
    this._Camera.layers.enable(LayerType.Models);

    window.addEventListener(EventType.Resize, this._OnWindowResize.bind(this), false);
  }

  private _ConfigureControls(): void { // This should load settings from JSON
    this._OrbitControl.enableKeys = false;

    this._OrbitControl.enableDamping = true;
    this._OrbitControl.dampingFactor = 1.25;
    
    this._OrbitControl.minDistance = 10;
    this._OrbitControl.maxDistance = 500; // This should be twice the size of the build plate
  }

  public Configure(fieldOfView: number = 90, nearPlane: number = 1, farPlane: number = 5000): void {
    this._Camera.fov = fieldOfView;
    this._Camera.near = nearPlane;
    this._Camera.far = farPlane;
    this._Camera.updateProjectionMatrix();

    if (this._OrbitControl) {
      this._OrbitControl.update();
    }
  }

  public Position(x: number, y: number, z: number): void {
    this._Camera.position.set(x, y, z);
    this._Camera.updateProjectionMatrix();

    if (this._OrbitControl) {
      this._OrbitControl.update();
    }
  }

  public OnAnimate(): void {
    if (this._OrbitControl && (this._OrbitControl.enableDamping || this._OrbitControl.autoRotate)) {
      this._OrbitControl.update();
    }
  }

  public OnRender(): void {}

  private _OnWindowResize(): void {
    if (!this._Camera) return;
    this.Canvas = this.Canvas; // Trigger an update by triggering the setter for Canvas
  }
}