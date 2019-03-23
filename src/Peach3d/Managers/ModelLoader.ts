import { Injectable } from "@angular/core";
import { STLLoader, GCodeLoader, Object3D } from "three-full";

@Injectable()
export class ModelLoader {
  public Stl(url: string): Promise<Object3D> {
    return new Promise<Object3D>((resolve, reject) => {
      // TODO: add onProgress functionality
      (new STLLoader()).load(url, resolve, null, reject);
    });
  }

  public GCode(url: string): Promise<Object3D> {
    return new Promise<Object3D>((resolve, reject) => {
      // TODO: add onProgress functionality
      (new GCodeLoader()).load(url, resolve, null, reject);
    });
  }
}


/*
function promisifyLoader ( loader, onProgress ) {

  function promiseLoader ( url ) {

    return new Promise( ( resolve, reject ) => {

      loader.load( url, resolve, onProgress, reject );

    } );
  }

  return {
    originalLoader: loader,
    load: promiseLoader,
  };

}
*/