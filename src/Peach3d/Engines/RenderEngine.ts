import { Injectable, HostListener } from "@angular/core";

import { WebGLRenderer, PCFShadowMap, Camera, Scene } from "three-full";
import { QuickEvent, CameraEngine, SceneEngine } from "./";
import { EventType } from "../Enums";

@Injectable()
export class RenderEngine {
  public OnAnimateEvents: QuickEvent = new QuickEvent();
  public OnRenderEvents:  QuickEvent = new QuickEvent();

  public AntiAlias: boolean = true;
  public ShadowMap: boolean = true;

  private _Renderer: WebGLRenderer;
  private _Canvas: HTMLCanvasElement;

  public get Renderer(): WebGLRenderer {
    return this._Renderer;
  }

  public get Canvas(): HTMLCanvasElement {
    return this._Canvas;
  }

  constructor(private cameraEngine: CameraEngine, private sceneEngine: SceneEngine) {
    this.OnAnimateEvents.Subscribe(cameraEngine.OnAnimate);
    this.OnRenderEvents.Subscribe(cameraEngine.OnRender);

    this.OnAnimateEvents.Subscribe(sceneEngine.OnAnimate);
    this.OnRenderEvents.Subscribe(sceneEngine.OnRender);
  }

  public Init(canvas: HTMLCanvasElement): void {
    this._Canvas = canvas;
    this.cameraEngine.Canvas = canvas;

    this._Renderer = new WebGLRenderer({ antialias: this.AntiAlias, canvas: this._Canvas });
    this._Renderer.setPixelRatio(window.devicePixelRatio);
    this._Renderer.setSize(this._Canvas.clientWidth, this._Canvas.clientHeight);
    this._Renderer.shadowMap.enabled = this.ShadowMap;

    if (this.ShadowMap) {
      this._Renderer.shadowMap.type = PCFShadowMap;
    }

    window.addEventListener(EventType.Resize, this._OnWindowResize.bind(this), false);
  }

  public Start(): void {
    if (!this._Renderer) throw Error("RenderEngine.Init() has not been called.");

    this.Animate();
  }

  @HostListener(EventType.WindowResize, ["$event"])
  private _OnWindowResize(event: Event): void {
    if (!this._Renderer) return;
    this._Renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public Animate(): void {
    requestAnimationFrame(this.Animate.bind(this));
    this.Render();
    this.OnAnimateEvents.Trigger(this);
  }

  public Render(): void {
    this.OnRenderEvents.Trigger(this);
    this._Renderer.render(this.sceneEngine.Scene, this.cameraEngine.Camera);
  }
}