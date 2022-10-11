import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import GraphicLayer from "@arcgis/core/layers/GraphicsLayer";
import { locationToAddress } from "@arcgis/core/rest/locator";
import { ComputedRef, reactive, ref } from "vue";
import { computed } from "@vue/reactivity";

const map = new Map({
  basemap: "satellite"
});

const mapView = new MapView({
  map: map,
  zoom: 5,
  center: [15.255119, 54.525961]
});

const graphicLayer = new GraphicLayer();

export async function createMap(e: HTMLDivElement): Promise<MapView> {
  mapView.container = e;
  const searcWidget = new Search({ view: mapView })
  mapView.ui.add(searcWidget, { position: "top-trailing" });
  await mapView.when();
  map.add(graphicLayer);
  await graphicLayer.when();
  return mapView;
}

export function drawClickedPoint(e: __esri.ViewClickEvent) {
  // pinGraphic.symbol = new TextSymbol({
  //   color: [226, 119, 40],
  //   text: "\ue61d",
  //   font: {
  //     size: 36,
  //     family: "CalciteWebCoreIcons"
  //   }
  // });
  const symbol = new SimpleMarkerSymbol({
    color: [226, 119, 40],
    size: 36
  });

  const point = new Point({
    latitude: e.mapPoint.latitude,
    longitude: e.mapPoint.longitude
  });

  const pinGraphic = new Graphic({
    geometry: point,
    symbol: symbol
  });
  graphicLayer.removeAll();
  graphicLayer.add(pinGraphic);
}

export async function getLocationText(point: Point): Promise<string> {
  const candidates = await locationToAddress("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer", {
    location: point,
    locationType: "street"
  });
  return candidates.attributes.LongLabel;
}

const METEOSTAT_ENDPOINT = "https://meteostat.p.rapidapi.com/point/normals"


export interface IMeteostatData {
  start: number,
  end: number,
  month: number,
  tavg: number | null,
  tmin: number | null,
  tmax: number | null,
  prcp: number | null,
  wspd: number | null,
  pres: number | null,
  tsun: number | null,
}

interface IMeteostatResponse {
  meta: {
    generated: string,
    stations: string[]
  },
  data: IMeteostatData[]
}



const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '36a0bdd8a8msh4c9db1e86c52d1cp1b4214jsnff2f923ff5f1',
    'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
  }
};

export async function fetchMeteostatData(latitude: number, longitude: number): Promise<IMeteostatData[]> {
  const fetchResponse = await fetch(`${METEOSTAT_ENDPOINT}?lat=${latitude}&lon=${longitude}&units=metric&start=1990`, options)

  const meteostatResponse = await fetchResponse.json() as IMeteostatResponse;
  return  meteostatResponse.data.filter(d => d.start <= 1991 && d.end >= 2020);
  // const meteostatResponse: IMeteostatResponse = {
  //   "meta": { "generated": "2022-08-02 09:28:07", "stations": ["16181", "16179", "16221", "16172"] },
  //   "data": [{ "start": 1961, "end": 1990, "month": 1, "tavg": 3.8, "tmin": 1.4, "tmax": 6.1, "prcp": 76.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 2, "tavg": 4.5, "tmin": 2.0, "tmax": 7.0, "prcp": 86.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 3, "tavg": 7.1, "tmin": 4.0, "tmax": 10.2, "prcp": 91.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 4, "tavg": 10.7, "tmin": 7.2, "tmax": 14.2, "prcp": 96.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 5, "tavg": 15.3, "tmin": 11.4, "tmax": 19.2, "prcp": 107.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 6, "tavg": 19.2, "tmin": 14.9, "tmax": 23.4, "prcp": 88.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 7, "tavg": 22.2, "tmin": 17.7, "tmax": 26.8, "prcp": 65.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 8, "tavg": 21.7, "tmin": 17.3, "tmax": 26.1, "prcp": 92.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 9, "tavg": 18.2, "tmin": 14.5, "tmax": 21.9, "prcp": 100.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 10, "tavg": 13.4, "tmin": 10.6, "tmax": 16.2, "prcp": 110.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 11, "tavg": 8.4, "tmin": 6.1, "tmax": 10.8, "prcp": 140.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1961, "end": 1990, "month": 12, "tavg": 4.9, "tmin": 2.7, "tmax": 7.1, "prcp": 106.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 1, "tavg": 5.0, "tmin": 2.8, "tmax": 7.3, "prcp": 70.8, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 2, "tavg": 5.4, "tmin": 2.8, "tmax": 7.9, "prcp": 78.6, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 3, "tavg": 8.3, "tmin": 5.1, "tmax": 11.5, "prcp": 107.1, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 4, "tavg": 13.0, "tmin": 8.9, "tmax": 17.2, "prcp": 74.6, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 5, "tavg": 16.5, "tmin": 12.0, "tmax": 21.0, "prcp": 99.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 6, "tavg": 21.7, "tmin": 16.9, "tmax": 26.5, "prcp": 71.1, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 7, "tavg": 24.7, "tmin": 19.6, "tmax": 29.8, "prcp": 52.8, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 8, "tavg": 24.1, "tmin": 19.3, "tmax": 28.9, "prcp": 49.4, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 9, "tavg": 18.9, "tmin": 15.0, "tmax": 22.8, "prcp": 103.0, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 10, "tavg": 14.0, "tmin": 11.0, "tmax": 17.0, "prcp": 85.5, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 11, "tavg": 10.0, "tmin": 7.7, "tmax": 12.2, "prcp": 135.6, "wspd": null, "pres": null, "tsun": null }, { "start": 1991, "end": 2020, "month": 12, "tavg": 5.8, "tmin": 3.5, "tmax": 8.0, "prcp": 110.2, "wspd": null, "pres": null, "tsun": null }]
  // };
  // return new Promise((res, rej) => { res(meteostatResponse.data.filter(d => d.start <= 1991 && d.end >= 2020)); })

}

//MODELS PARAMETERS AND CALCULATION
//VARIABLE PARAMETERS
export const inputParameters = reactive({
  Q: 80,
  Ci: 22.3,
  A: 1000,
  P: 3,
  Cb: 1.5
})

//FIXED PARAMETERS
let theta = 1.056;
let h = 0.5;
let k20 = 0.0589;
let ev = 0.7;
// let tau = 4.38;

export function calculateModel(monthTemperature: number): ComputedRef<number> {
  return computed(() => {
    const HRT = ((inputParameters.A * h) / inputParameters.Q) * ev;
    const r = ((inputParameters.Ci - inputParameters.Cb) / (1 + (((k20 * (theta ** (monthTemperature - 20))) / (h * ev)) * HRT / inputParameters.P)) ** inputParameters.P) + inputParameters.Cb
    return Math.round(r * 10) / 10;
  })
}

export function calculateRemovalEfficiency(monthTemperature: number): ComputedRef<number> {
  return computed(() => {
    const cout = calculateModel(monthTemperature);
    const r = 1 - (cout.value / inputParameters.Ci);
    return Math.round(r * 100)
  });
}


export function monthName(monthNumnber: number): string {
  const d = new Date();
  d.setMonth(monthNumnber - 1);
  const monthName = d.toLocaleString("en", { month: "long" });
  return monthName;
}