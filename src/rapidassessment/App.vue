<template>
  <div class="container-fluid">
    <div class="row">
      <div id="map" class="col-sm-6">

      </div>
      <div id="result" class="col-sm-6">

        <h1>Wateragri Solutions Rapid Assessment</h1>
        <template v-if="sol_filtered.length == 0">
          <div class="alert alert-info">
            Choose a location on the map to evaluate the best Wateragri solutions
          </div>
        </template>
        <template v-else>
          <h3>Best solutions for {{ sel_location?.name }}</h3>
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="text-align-center align-center" rowspan="2" scope="col">Solution</th>
                <th colspan="3" scope="col">Suitability</th>
              </tr>
              <tr>
                <th scope="col">General</th>
                <th scope="col">Environmental</th>
                <th scope="col">Social</th>
                <th scope="col">Economic</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sol in sol_grouped">
                <td>{{ sol.solution }}</td>
                <td>
                  <SuitabilityTag :key="Math.random()" :solution="sol.gen"></SuitabilityTag>
                </td>
                <td>
                  <SuitabilityTag :key="Math.random()" :solution="sol.env"></SuitabilityTag>
                </td>
                <td>
                  <SuitabilityTag :key="Math.random()" :solution="sol.soc"></SuitabilityTag>
                </td>
                <td>
                  <SuitabilityTag :key="Math.random()" :solution="sol.eco"></SuitabilityTag>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SuitabilityTag from './SuitabilityTag.vue';
import { ref, onMounted, readonly } from 'vue'
import { map, tileLayer, geoJSON, Icon } from "leaflet";
import { solutions as modelSolutions, locations as modelLocations } from './data'
import { FeatureCollection, Point } from 'geojson';
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";


Icon.Default.prototype.options.iconUrl = markerIconUrl;
Icon.Default.prototype.options.iconRetinaUrl = markerIconRetinaUrl;
Icon.Default.prototype.options.shadowUrl = markerShadowUrl;
Icon.Default.imagePath = "";

const solutions = readonly(modelSolutions);

const locations = readonly(modelLocations);

const sol_filtered = ref<AssessmentItem[]>([]);


const sel_location = ref<AssessmentLocation | null>(null);
const sol_grouped = ref<Solution[]>([])


onMounted(() => {
  const modelmap = map('map').setView([51.505, -0.09], 13)
  tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(modelmap)


  let geojson: FeatureCollection<Point, Readonly<AssessmentLocation>> = {
    "type": "FeatureCollection",
    "features": []
  }

  locations.forEach((location, index) => {
    geojson.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [location.lng, location.lat]
      },
      "properties": location
    })
  })

  const geoJSONlayer = geoJSON(geojson, {

    onEachFeature: function (feature, layer) {
      layer.on('click', function (e) {

        let prop = feature.properties
        let popup = `
          <h3>${prop.name}</h3>
          <p>Zone: ${prop.zone}</p>
          <a href="${prop.url}" target="_blank">Go to location</a>
        `;

        layer.bindPopup(popup).openPopup();

        sel_location.value = prop;

        //selected location by WATERAGRI_Sites=prop.code
        sol_filtered.value = [];

        sol_filtered.value = solutions.filter((sol) => {
          return sol.WATERAGRI_Sites == prop.code
        })

        const grouping: Record<string, Solution> = {}
        //group by solutions
        sol_filtered.value.forEach((sol) => {
          if (!grouping[sol.solution]) {
            grouping[sol.solution] = { "solution": sol.solution, eco: null!, env: null!, gen: null!, soc: null! }
          }

          if (!grouping[sol.solution][sol.dim]) {
            grouping[sol.solution][sol.dim] = sol
          }
        })

        let array = []
        //for each key add sol
        for (const [key, value] of Object.entries(grouping)) {
          if (value.solution !== "-") {
            array.push(value)
          }
        }

        //sort by sol.gen.suitability desc;
        array.sort((a, b) => {
          return b.gen.suitability - a.gen.suitability
        })

        sol_grouped.value = array





      })
    }
  }).addTo(modelmap)


  //zoom to geojson counds
  modelmap.fitBounds(geoJSONlayer.getBounds())




})

</script>
<style>
#map {
  height: 100vh;
}
</style>