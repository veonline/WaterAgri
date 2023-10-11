<template>
  <div id="mapContainer" class="container">
    <div ref="mainMap" id="mainMap"></div>
  </div>
  <div class="tiff-selection-buttons" ref="buttons" v-show="mapready">
    <button>A</button>
    <button>B</button>
  </div>
</template>
<script src="./App.ts" lang="ts"></script>