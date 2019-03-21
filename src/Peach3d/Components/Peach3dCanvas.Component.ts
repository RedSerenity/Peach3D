import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "peach3d-canvas",
  template: "<canvas #RenderCanvas></canvas>"
})
export class Peach3dCanvasComponent {
  @ViewChild('RenderCanvas') private _Canvas: ElementRef;
}