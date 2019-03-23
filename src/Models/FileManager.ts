import { CUBE_STL, CUBE_GCODE, HEAT_BED } from './Models';

export class FileManager {
  private static _CubeStl: string;
  private static _CubeGCode: string;
  private static _HeatBedStl: string;

  public static get CubeStl(): string {
    if (!FileManager._CubeStl) {
      FileManager._CubeStl = FileManager.CreateUrl(FileManager.B64toBlob(CUBE_STL, "model/stl"));
    }

    return FileManager._CubeStl;
  }

  public static get CubeGCode(): string {
    if (!FileManager._CubeGCode) {
      FileManager._CubeGCode = FileManager.CreateUrl(FileManager.B64toBlob(CUBE_GCODE, "application/x-gcode"));
    }

    return FileManager._CubeGCode;
  }

  public static get HeatBedStl(): string {
    if (!FileManager._HeatBedStl) {
      FileManager._HeatBedStl = FileManager.CreateUrl(FileManager.B64toBlob(HEAT_BED, "model/stl"));
    }

    return FileManager._HeatBedStl;
  }

  private static B64toBlob(data: string, contentType: string = "", sliceSize: number = 512) {
    const byteCharacters = atob(data);
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        
        byteArrays.push(byteArray);
      }
      
      return new Blob(byteArrays, { type: contentType });
  }

  private static CreateUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }
}