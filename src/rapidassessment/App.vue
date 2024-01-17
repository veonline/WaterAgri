<template>
    <div class="container-fluid">
      <div class="row">
        <div id="map" class="col-sm-6">
            
        </div>
        <div id="result" class="col-sm-6">
          
          <h1>Wateragri Solutions Rapid Assessment</h1>
          <template v-if="sol_filtered.length==0">
            <div class="alert alert-info">
              Choose a location on the map to evaluate the best Wateragri solutions
            </div>
          </template>
          <template v-else>
            <h3>Best solutions for {{sel_location?.name}}</h3>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Solution</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sol in sol_filtered" :key="sol.solution">
                  <td>{{sol.solution}}</td>
                  <td>{{sol.suitability}}</td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      </div>
    </div>
</template>
<script setup>

import { ref, onMounted, onUnmounted } from 'vue'

import {getSolutions, getLocations} from './data.js'


const solutions=ref(getSolutions())

const location = ref(
  getLocations()
)

const sol_filtered=ref([])


const sel_location=ref(null)

onMounted(() => {
  map.value = L.map('map').setView([51.505, -0.09], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value)


  let geojson={
    "type": "FeatureCollection",
    "features":[]
  }

  location.value.locations.forEach((location, index) => {
    geojson.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [location.lng, location.lat]
      },
      "properties": location
    })
  })

  L.geoJSON(geojson, {
    onEachFeature: function (feature, layer) {
      layer.on('click', function (e) {

        let prop=feature.properties
        let popup=`
          <h3>${prop.name}</h3>
          <p>Zone: ${prop.zone}</p>
          <a href="${prop.url}" target="_blank">Go to location</a>
        `;

        layer.bindPopup(popup).openPopup();

        sel_location.value=prop;

        //selected location by WATERAGRI_Sites=prop.code

        sol_filtered.value=solutions.value.filter((sol) => {
          return sol.WATERAGRI_Sites==prop.code
        })


        console.log(sol_filtered.value)



      })
    }
  }).addTo(map.value)


  //zoom to geojson counds
  map.value.fitBounds(L.geoJSON(geojson).getBounds())




})



</script>
  <style>
 
  #map {
    height: 100vh;
  } 
  </style>