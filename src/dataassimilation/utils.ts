import { ReadRasterResult, TypedArray } from "geotiff"

//colorChannelA and colorChannelB are ints ranging from 0 to 255
function colorChannelMixer(
  colorChannelA: number,
  colorChannelB: number,
  amountToMix: number,
) {
  var channelA = colorChannelA * amountToMix
  var channelB = colorChannelB * (1 - amountToMix)
  return Math.trunc(channelA + channelB)
}

export function colorMixer(rgbA: number[], rgbB: number[], amountToMix: number) {
  let r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix)
  let g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix)
  let b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix)
  return [r, g, b]
}

export function normalizeValue(v: number) {
  return Math.min(Math.max(0, v), 1)
}

export function iterateRaster(buffer: ReadRasterResult, func: (x: number, i: number, data: TypedArray) => void) {
  if (!func) throw 'iteration function not defined'
  buffer.forEach((x, i) => {
    if (typeof x == 'number') {
      func(x, i, buffer as TypedArray)
    } else if (typeof x == 'object') {
      x.forEach((xx, i) => {
        func(xx, i, x)
      })
    }
  })
}


