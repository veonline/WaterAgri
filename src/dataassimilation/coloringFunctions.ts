import { ReadRasterResult } from 'geotiff'
import { iterateRaster, normalizeValue, colorMixer } from './utils'
// import webWorkerBuilder from "web-worker-func";
import { Imagery } from './mapColors'


export const ColoringFunction = ({ buffer, nodata, alpha = 1, nodataColor }: ColoringFunctionParameters): Uint8Array => {
  const texture: number[] = []
  iterateRaster(buffer, (x) => {
    const v = normalizeValue(x);
    let color = [0, 0, 0, 0]
    if (v == 0) {
      texture.push(0, 0, 0, 0);
      return;
    }
    if (v <= 0.2)
      color = colorMixer(Imagery.C1, Imagery.C2, v / 0.2)
    else if (v > 0.2 && v <= 0.4)
      color = colorMixer(Imagery.C2, Imagery.C3, (v - 0.2) / 0.2)
    else if (v > 0.4 && v <= 0.6)
      color = colorMixer(Imagery.C3, Imagery.C4, (v - 0.4) / 0.2)
    else if (v > 0.6 && v <= 0.8)
      color = colorMixer(Imagery.C4, Imagery.C5, (v - 0.6) / 0.2)
    else
      color = colorMixer(Imagery.C5, Imagery.C6, (v - 0.8) / 0.2)
    texture.push(color[0], color[1], color[2], 255)
  })
  return new Uint8Array(texture)
}
