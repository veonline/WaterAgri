import type ReadRasterResult from "geotiff";

type BilinearInterpolationParameters = {
  rasterResult: ReadRasterResult,
  noDataValue: number | null,
  enabled?: boolean,
  steps?: number
  size?: number
}


type ColoringFunctionParameters = {
  buffer: ReadRasterResult;
  nodata: number | null;
  alpha?: number;
  stretch?: boolean;
  nodataColor?: number[];
}