import { defineComponent, onMounted, onUnmounted, provide, reactive, ref, watch, watchEffect } from "vue";
import { THEME_KEY } from "vue-echarts";
import { createMap } from "../waterretention/utils";
import MediaLayer from "@arcgis/core/layers/MediaLayer";
import Extent from "@arcgis/core/geometry/Extent";
import Polygon from "@arcgis/core/geometry/Polygon"
import LocalMediaElementSource from "@arcgis/core/layers/support/LocalMediaElementSource";
import ExtentAndRotationGeoreference from "@arcgis/core/layers/support/ExtentAndRotationGeoreference";
import ImageElement from "@arcgis/core/layers/support/ImageElement";
import { geographicToWebMercator } from "@arcgis/core/geometry/support/webMercatorUtils";

import { type ReadRasterResult, fromBlob } from "geotiff";
import { bilinearInterpolation, normalizeValue, valueStatistics } from "./dataCleaningFunctions";
import { ColoringFunction } from "./coloringFunctions";
export default defineComponent({
  setup() {
    provide(THEME_KEY, 'light')

    const mainMap = ref<HTMLDivElement>();
    const buttons = ref<HTMLDivElement>();
    const mapready = ref(false);
    let mapView: __esri.MapView = null!;
    const rasterType = ref<'deep_drain' | 'no_deep_drain'>('deep_drain')

    const mediaLayer = new MediaLayer({
      opacity: 1,
      source: new LocalMediaElementSource(),
      title: "Drain Type",
      blendMode: "normal",
      visible: true,
    } as any);


    onMounted(async () => {
      mapView = await createMap(mainMap.value!, false);
      mapView.map.add(mediaLayer);
      mapView.ui.add(buttons.value!, "top-trailing");
      mapready.value = true;
      await showRaster(rasterType.value);
    });

    

    async function showRaster(tiffname: 'deep_drain' | 'no_deep_drain') {
      if (!mapView) return;
      await mapView.when();
      await mediaLayer.when();
      rasterType.value = tiffname
      const tifffromfetch = await fetch(`./geotifs/${tiffname}_4326.tiff`);
      const blobbolo = await tifffromfetch.blob();
      const geotiffolo = await fromBlob(blobbolo);
      const gtiffimage = await geotiffolo.getImage();
      const bbox = gtiffimage.getBoundingBox(); //<-- bounding box del geotiff (è l'extent con un altro nome)
      const rasterNoDataValue = gtiffimage.getGDALNoData(); //<-- no data value del raster
      const raster = await geotiffolo.readRasters(); //<-- estraiamo l'array di bytes dell'immagine

      const rasterBufferColored = new Uint8ClampedArray(ColoringFunction({ buffer: raster as ReadRasterResult, nodata: rasterNoDataValue })); //<<<<------ FUNZIONE DI COLORAZIONE SELEZIONATA

      //prepararazion dei dati per il disegno vero e proprio
      //preparo i dati dell'immagine dall'array di RGBA
      const imgdataColored = new ImageData(rasterBufferColored, raster.width, raster.height);

      //recupero lo stato della mappa dal MapView, mi serve per le conversioni dallo spazio di coordinate geografiche a quelle del canvas della mappa, rotazioni della mappa e quant'altro
      const viewState: __esri.ViewState & { pixelRatio: number } = mapView.get("state");

      //preparo l'extent arcgis dal bounding box rel raster
      let rasterExtent = new Extent({
        spatialReference: { wkid: 4326 },
        xmin: bbox[0],
        ymin: bbox[1],
        xmax: bbox[2],
        ymax: bbox[3]
      });
      let geom = new Polygon({
        spatialReference: { wkid: 4326 },
        rings: [[
          [rasterExtent.xmin, rasterExtent.ymin],
          [rasterExtent.xmin, rasterExtent.ymax],
          [rasterExtent.xmax, rasterExtent.ymax],
          [rasterExtent.xmax, rasterExtent.ymin],
          [rasterExtent.xmin, rasterExtent.ymin],
        ]]
      });
      if (mapView.spatialReference.isWebMercator && rasterExtent.spatialReference.isGeographic) {
        rasterExtent = geographicToWebMercator(rasterExtent) as __esri.Extent;
        geom = geographicToWebMercator(geom) as __esri.Polygon;
      }
      //preparo i punti nordovest (alto a sinistra), nordest (alto a destra), e sudovest (basso a sinistra) per calcolare le dimensioni del canvas di destinazione finale
      const nw: number[] = [];
      const ne: number[] = [];
      const sw: number[] = [];
      viewState.toScreenNoRotation(sw, rasterExtent.extent.xmin, rasterExtent.extent.ymin); //<- i punti non devono essere ruotati, altrimenti le dimensioni risultanti cambiano e tutto diventa un bordello pazzesco
      viewState.toScreenNoRotation(nw, rasterExtent.extent.xmin, rasterExtent.extent.ymax);
      viewState.toScreenNoRotation(ne, rasterExtent.extent.xmax, rasterExtent.extent.ymax);
      const targetCanvasWidth = ne[0] - nw[0]; //<- la larghezza del canvas finale è la distanza tra le x dei degli angoli nordest e nordovest
      const targetCanvasHeight = sw[1] - nw[1]; //<- l'altezza del canvas finale è la distanza tra le y degli angoli sudovest e nordovest


      //preparo un canvas offscreen dove disegnerò i dati colorati delle dimensioni del raster originale
      const offscreenCanvas = new OffscreenCanvas(raster.width, raster.height);
      //prendo il contesto 2d del canvas per il disegno dei colori e gli disabilito lo smothing (voglio l'immagine risultante nettamente pixellata, niente sbrodolature di pixels)
      const offscreenCanvasContext = offscreenCanvas.getContext("2d");
      if (!offscreenCanvasContext) throw "canvas context creation failed"
      if (offscreenCanvasContext.webkitImageSmoothingEnabled) offscreenCanvasContext.webkitImageSmoothingEnabled = false;
      if (offscreenCanvasContext.mozImageSmoothingEnabled) offscreenCanvasContext.mozImageSmoothingEnabled = false;
      offscreenCanvasContext.imageSmoothingEnabled = false;

      //non sono sicuro che lo scale serva...
      //calcolo il fattore di scala tra la dimensione del canvas finale e il canvas di disegno del'indice
      // const scaleXratio = targetCanvasWidth / offlineCanvas.width;
      // const scaleYratio = targetCanvasHeight / offlineCanvas.height;
      //offlineCanvasContext.scale(scaleXratio, scaleYratio); 

      //schiaffo i pixel colorati dentro il canvas offscreen
      offscreenCanvasContext.putImageData(imgdataColored, 0, 0, 0, 0, raster.width, raster.height);


      //ridisegno nel canvas di destinazione finale con ritaglio della geometria del campo, rotazioni e mazzicazzi per tenere il raster dell'indice "bello appiccicato" alla geometria sulla mappa
      const resultingCanvas = document.createElement("canvas");
      resultingCanvas.width = targetCanvasWidth;
      resultingCanvas.height = targetCanvasHeight;
      //come per il canvas di disegno dei colori, voglio i pixel belli netti
      const resultingCanvasContext = resultingCanvas.getContext("2d")!;
      if (resultingCanvasContext.webkitImageSmoothingEnabled) offscreenCanvasContext.webkitImageSmoothingEnabled = false;
      if (resultingCanvasContext.mozImageSmoothingEnabled) offscreenCanvasContext.mozImageSmoothingEnabled = false;
      resultingCanvasContext.imageSmoothingEnabled = false;

      //translo le coordinate del canvas di destinazione all'origine a schermo della mappa (0, 0 - angolo in alto a sinistra della mappa)
      // così che le coordinate della geometria non devono essere ricalcolate punto per punto
      resultingCanvasContext.translate(-nw[0], -nw[1]);
      //ricalco la geometria del campo segmento per segmento
      resultingCanvasContext.beginPath();
      geom.rings.forEach(ring =>
        ring.forEach(element => {
          const point = [0, 0];
          viewState.toScreenNoRotation(point, element[0], element[1]);
          const xnorm = point[0];
          const ynorm = point[1];
          resultingCanvasContext.lineTo(xnorm, ynorm);
        }));
      resultingCanvasContext.closePath();
      //applico il ritaglio per disegnare solo __dentro__ la geometria del campo
      resultingCanvasContext.clip();
      //riporto le coordinate del canvas alla sua posizione originaria
      resultingCanvasContext.translate(nw[0], nw[1]);
      //copio i pixel colorati, YAY!!!
      resultingCanvasContext.drawImage(offscreenCanvas, 0, 0, raster.width, raster.height, 0, 0, targetCanvasWidth, targetCanvasHeight)
      //calcolo la rotazione del canvas per ricalcare quella della mappa
      const pixelRatio = viewState.pixelRatio;
      const mapRotationAngle = viewState.rotation > 180 ? viewState.rotation - 360 : viewState.rotation; //<- riporto l'angolo di rotazione della mappa da 0-360 a -180+180 se no la rotazione del canvas mi ribalta l'immagine
      resultingCanvasContext.translate(targetCanvasWidth * pixelRatio * 0.5, targetCanvasHeight * pixelRatio * 0.5); //<- sposto le coordinate del canvas al centro del canvas stesso...
      resultingCanvasContext.rotate(mapRotationAngle * (Math.PI / 180) / 2); //<- ...così che la rotazione avviene sul suo centrto (altrimenti il canvas ruota sull'angolo in alto sx)
      resultingCanvasContext.translate(targetCanvasWidth * pixelRatio * -0.5, targetCanvasHeight * pixelRatio * -0.5); //e poi riporto le coordinte del canvas al loro valore originale

      //preparo l'image element che popolerà il mediFOTTUTISSIMOlayer
      const geoReference = new ExtentAndRotationGeoreference({
        extent: rasterExtent
      });
      const imageElement = new ImageElement({
        image: resultingCanvas,
        georeference: geoReference,
        opacity: 1
      });
      if ((mediaLayer.source as LocalMediaElementSource).elements.length > 0)
        (mediaLayer.source as LocalMediaElementSource).elements.removeAll();
      await mapView.goTo(rasterExtent);
      await mediaLayer.when();
      (mediaLayer.source as LocalMediaElementSource).elements.add(imageElement);
    }

    return {
      mainMap,
      buttons,
      mapready,
      showRaster,
      rasterType
    }
  }
});