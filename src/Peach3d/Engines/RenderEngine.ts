import { Injectable } from "@anglar/core";

import { WebGLRenderer, PCFShadowMap, Camera, Scene } from "three-full";
import { QuickEvent } from "./";

import { CameraEngine } from './CameraEngine';
import { SceneEngine } from './SceneEngine';
import { EventType } from './Enums';

@Injectable()
export class RenderEngine {
  public OnRender: QuickEvent = new QuickEvent();
  public OnAnimate: QuickEvent = new QuickEvent();

  public AntiAlias: boolean = true;
  public ShadowMap: boolean = true;

  private _Renderer: WebGLRenderer;
  private _Canvas: HTMLElement;

  public get Renderer(): WebGLRenderer {
    return this._Renderer;
  }

  public get Canvas(): HTMLElement {
    return this._Canvas;
  }

  constructor(private cameraEngine: CameraEngine, private sceneEngine: SceneEngine) {

  }

  public Init(): void {
    if (!this._Canvas) {
      throw Error("RenderEngine.SetCanvas() or RenderEngine.Configure() has not been called.");
    }

    if (!this._Camera) {
      throw Error("RenderEngine.SetCamera() or RenderEngine.Configure() has not been called.");
    }

    if (!this._Scene) {
      throw Error("RenderEngine.SetScene() or RenderEngine.Configure() has not been called.");
    }

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

    this._Animate();
  }

  public SetCanvas(canvasId: string): void {
    this._Canvas = document.getElementById(canvasId);
    if (!this._Canvas) {
      throw Error("Failed to get Canvas Element.");
    }
  }

  public SetScene(scene: SceneEngine): void {
    if (!scene) {
      throw Error("You must provide a valid SceneEngine object.");
    }

    this._Scene = scene;
    this.OnAnimate.Subscribe(this._Scene.OnAnimate);
    this.OnRender.Subscribe(this._Scene.OnRender);
  }

  public SetCamera(camera: CameraEngine): void {
    if (!camera) {
      throw Error("You must provide a valid CameraEngine object.");
    }
    if (!this._Canvas) {
      throw Error("RenderEngine.SetCanvas() must be called be RenderEngine.SetCamera().");
    }

    camera.Canvas = this._Canvas;
    this._Camera = camera;
    this.OnAnimate.Subscribe(this._Camera.OnAnimate);
    this.OnRender.Subscribe(this._Camera.OnRender);
  }

  private _OnWindowResize(): void {
    if (!this._Renderer) return;
    this._Renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private _Animate(): void {
    requestAnimationFrame(this._Animate.bind(this));
    this.Render();
    this.OnAnimate.Trigger(this);
  }

  public Render(): void {
    this.OnRender.Trigger(this);
    this._Renderer.render(this._Scene.Scene, this._Camera.Camera);
  }
}