import { 
  Scene, Color, Object3D, Mesh, PlaneBufferGeometry, MeshPhongMaterial, 
  AxesHelper, DirectionalLight, AmbientLight, HemisphereLight,
  Box3, Vector3, DragControls
} from "three-full";
import { IRenderEvents } from "../Contracts";
import { LayerType } from "../Enums";

export class SceneEngine implements IRenderEvents {
  private _Scene: Scene;

  public get Scene(): Scene {
    return this._Scene;
  }

  constructor() {
    this._Scene = new Scene();
    this.BackgroundColor();
  }

  public OnAnimate(): void {}
  public OnRender(): void {}

  public Add(object3d: Object3D): void {
    if (!object3d) return;
    this._Scene.add(object3d);
  }

  public BackgroundColor(hexColor: number = 0xe8f8ff): void {
    this._Scene.background = new Color(hexColor);
  }

  public AddAxesHelper(size: number = 20): void {
    this.Add(new AxesHelper(size));
  }

  public AddDirectionalLight(hexColor: number = 0xffffff, intensity : number = 0.8 ): void {
    this.Add(new DirectionalLight( hexColor, intensity));
  }

  public AddAmbientLight(hexColor: number = 0xffffff): void {
    const light = new AmbientLight(hexColor);
    light.layers.enable(LayerType.HeatBed);
    light.layers.enable(LayerType.Models);
    light.layers.enable(LayerType.GCode);
    this.Add(light);
  }

  public AddHemisphereLight(skyColor: number = 0x000000, groundColor: number = 0xffffff, intensity: number = 1): void {
    const light = new HemisphereLight( skyColor, groundColor, intensity)
    light.layers.enable(LayerType.HeatBed);
    light.layers.enable(LayerType.Models);
    light.layers.enable(LayerType.GCode);
    this.Add(light);
  }
}

/*

let scene = new Scene();
scene.background = new Color(0xb8cced);
scene.add( new AmbientLight( 0x505050 ) );
var light = new SpotLight( 0xffffff, 1.5 );
light.position.set( 0, 500, 2000 );
light.angle = Math.PI / 9;
light.castShadow = true;
light.shadow.camera.near = 1000;
light.shadow.camera.far = 4000;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
scene.add(light);
scene.add(new AxesHelper(200));

*/