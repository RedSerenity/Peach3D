import { NgModule } from "@angular/core";
import { Peach3dCanvasComponent } from "./Components";
import { CameraEngine, SceneEngine, RenderEngine, ModelLoaderEngine } from "./Engines";


const moduleComponents = [
  Peach3dCanvasComponent
];

const moduleServices = [
  CameraEngine,
  SceneEngine,
  RenderEngine,
  ModelLoaderEngine
];

@NgModule({
  imports: [],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
  providers: [...moduleServices]
})
export class Peach3dModule {}