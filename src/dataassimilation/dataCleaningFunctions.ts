import { ReadRasterResult, TypedArray } from "geotiff"
import { iterateRaster } from "./utils";



export function normalizeValue({ rasterResult, noDataValue, min, max }: { rasterResult: ReadRasterResult, noDataValue: number | null, min: number, max: number }): ReadRasterResult {
  let workcopy: ReadRasterResult = rasterResult.slice() as ReadRasterResult;
  const { width, height } = rasterResult;
  workcopy.width = width;
  workcopy.height = height;

  iterateRaster(workcopy, (value, i, data) => {
    if (value !== noDataValue) {
      const r = (value - min) / (max - min);
      data[i] = r; //Math.min(Math.max(r, 0), 1);
    }
  });

  return workcopy
}

export function valueStatistics(raster: ReadRasterResult, noDataValue: number | null): { min: number, max: number, average: number } {
  const goodValues: number[] = [];
  iterateRaster(raster, (value, i, data) => {
    if (value != noDataValue) {
      goodValues.push(value);
    }
  });

  const min = Math.min(...goodValues);
  const max = Math.max(...goodValues);
  const average = goodValues.reduce((a, c) => a + c, 0) / goodValues.length;
  return {
    min,
    max,
    average
  }
}


export function bilinearInterpolation({ rasterResult, noDataValue, size = 1, steps = 1 }: BilinearInterpolationParameters): ReadRasterResult {
  let workcopy: ReadRasterResult = rasterResult.slice() as ReadRasterResult;
  const { width, height } = rasterResult;
  workcopy.width = width;
  workcopy.height = height;

  for (let iteration = 0; iteration < steps; iteration++)
    iterateRaster(workcopy, (value, i, data) => {
      if (value === noDataValue) {
        const convolution = convolutionMatrix({ data: data, linearIndex: i, width, height, size: size });
        const good = convolution.filter((v) => v !== noDataValue);
        if (good.length != 0)
          data[i] = good.reduce((a: number, c: number) => c + a, 0) / good.length;
      }
    });

  return workcopy
}

type ConvolutionMatrixParameters = {
  data: TypedArray
  linearIndex: number
  width: number
  height: number
  size: number
}

function convolutionMatrix({
  data,
  linearIndex,
  width,
  height,
  size,
}: ConvolutionMatrixParameters): number[] {
  //ricostruisco x e y dall'indice lineare
  const x = linearIndex % width
  const y = Math.floor(linearIndex / width)
  // logger.debug("x", x, "y", y)
  const dxl = Math.max(0, x - size) //differenza a sinistra di x "clippata" al bordo
  const dxr = Math.min(width - 1, x + size) //differenza a destra di x "clippata" al bordo
  const dyu = Math.max(0, y - size) //differenza in alto di y "clippata" al bordo
  const dyd = Math.min(height - 1, y + size) //differenza in basso di y "clippata" al bordo
  const result = [] //valori della matrice di convoluzione
  // logger.debug("cx min", dxl, "cx max", dxr, "cy min", dyu, "cy max", dyd);
  for (let i = dyu; i <= dyd; i++) {
    //recupero i dati per la matrice di convoluzione riga per riga, da sopra a sotto
    const r = data.slice(dxl + (i * width), 1 + dxr + (i * width)) //
    result.push(...r);
  }
  return result
}