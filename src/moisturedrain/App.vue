<template>
  <div id="mapContainer" class="container">
    <div ref="mainMap" id="mainMap"></div>
  </div>
  <div class="tiff-selection-buttons" ref="buttons" v-show="mapready">
    <button @click="showRaster('deep_drain')" :class="{active : rasterType == 'deep_drain'}">With deep dranis</button>
    <button @click="showRaster('no_deep_drain')" :class="{active : rasterType == 'no_deep_drain'}">Without deeb drains</button>
  </div>
</template>
<script src="./App.ts" lang="ts"></script>
<style>
.tiff-selection-buttons {
  padding: 16px;
  background-color: #ffffff;
  border-radius: 4px;
}
button {
  font-family: Poppins, arial, sans-serif;
  margin: 5px;
  border-style: none;
  padding: 4px 8px;
}

button.active {
  pointer-events: none;
  border: 1px solid black;
}
</style>