import { Component, AfterViewInit } from "@angular/core";
import { ModelLoader, SceneEngine } from "../Peach3d";
import { FileManager } from "../Models/FileManager";

@Component({
  selector: 'application-root',
  template: '<peach3d-canvas></peach3d-canvas>',
  styleUrls: [ './Application.Component.scss' ]
})
export class ApplicationComponent implements AfterViewInit {

  constructor(private loader: ModelLoader, private sceneEngine: SceneEngine) {}

  ngAfterViewInit(): void {
    const self = this;
    this.loader.Stl(FileManager.HeatBedStl)
      .then((model) => {
        self.sceneEngine.Add()
      });
  }

}
