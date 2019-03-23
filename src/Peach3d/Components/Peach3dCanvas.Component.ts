import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RenderEngine } from "../Engines";

@Component({
  selector: "peach3d-canvas",
  template: "<canvas #RenderCanvas></canvas>",
  styles: [":host, canvas { height: 100%; width: 100%; }"]
})
export class Peach3dCanvasComponent implements AfterViewInit {
  @ViewChild('RenderCanvas') private _Canvas: ElementRef;

  public get Canvas(): HTMLCanvasElement {
    return this._Canvas.nativeElement;
  }

  constructor(private renderEngine: RenderEngine) {}

  ngAfterViewInit() {
    this.renderEngine.Init(this._Canvas.nativeElement);
  }
}