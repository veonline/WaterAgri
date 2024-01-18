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
                <tr v-for="sol in sol_grouped" >
                  <td>{{sol.solution}}</td>
                  <td><SuitabilityTag  :key="Math.random()" :solution="sol.gen"></SuitabilityTag></td>
                  <td><SuitabilityTag  :key="Math.random()" :solution="sol.env"></SuitabilityTag></td>
                  <td><SuitabilityTag  :key="Math.random()" :solution="sol.soc"></SuitabilityTag></td>
                  <td><SuitabilityTag  :key="Math.random()" :solution="sol.eco"></SuitabilityTag></td> 
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

import SuitabilityTag from './SuitabilityTag.vue';


const solutions=ref(getSolutions())

const location = ref(
  getLocations()
)

const sol_filtered=ref([])
const sol_grouped=ref({})


const sel_location=ref(null)


onMounted(() => {
  map.value = L.map('map').setView([51.505, -0.09], 13)
  L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

        console.log("KEY!1!");

        let prop=feature.properties
        let popup=`
          <h3>${prop.name}</h3>
          <p>Zone: ${prop.zone}</p>
          <a href="${prop.url}" target="_blank">Go to location</a>
        `;

        layer.bindPopup(popup).openPopup();

        sel_location.value=prop;

        //selected location by WATERAGRI_Sites=prop.code
        sol_filtered.value=[];

        sol_filtered.value=solutions.value.filter((sol) => {
          return sol.WATERAGRI_Sites==prop.code
        })

        sol_grouped.value={}
        //group by solutions
        sol_filtered.value.forEach((sol) => {
          if(!sol_grouped.value[sol.solution]){
            sol_grouped.value[sol.solution]={"solution":sol.solution}
          }

          if(!sol_grouped.value[sol.solution][sol.dim]){
            sol_grouped.value[sol.solution][sol.dim]=sol
          }
        })

        let array=[]
        //for each key add sol
        for (const [key, value] of Object.entries(sol_grouped.value)) {
          if(value.solution!=="-"){
            array.push(value)

          }
        }

        //sort by sol.gen.suitability desc;
        array.sort((a, b) => {
          return b.gen.suitability-a.gen.suitability
        })

        sol_grouped.value=array

        



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