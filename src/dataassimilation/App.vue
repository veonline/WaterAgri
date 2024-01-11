<template>
  <div id="mapContainer" class="container">
    <div ref="mainMap" id="mainMap"></div>
  </div>
  <div class="tiff-selection-buttons" ref="buttons" v-show="mapready">
    <button @click="showRasterLayerToggle">{{ rasterVisible ? 'hide' : 'show' }}</button>
    <button @click=" showRaster('with')" :class="{ active: rasterType == 'with' }">With data assimilation</button>
    <button @click="showRaster('without')" :class="{ active: rasterType == 'without' }">Without data
      assimilation</button>
    <div class="legend-container">
      <div class="legend"></div>
      <div class="low">low</div>
      <div class="high">high</div>
    </div>
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

.legend-container {
  font-size: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.legend {
  background-color: #ffff;
  height: 9px;
  width: 100%;
  background-image: linear-gradient(to right, rgb(253, 231, 37), rgb(122, 209, 81), rgb(34, 168, 132), rgb(42, 120, 142), rgb(65, 68, 135), rgb(68, 1, 84));

}
</style>