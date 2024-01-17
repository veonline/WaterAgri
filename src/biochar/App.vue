<template>
  <h1>
    Biochar for water retention
  </h1>
  <div class="container fill " id="formContainer">
    <div class="frow">
      <div class="col">
        <p class="info">
          This simplified model shows the water retention capacity of loamy soils when biochar is applied.
          <br />
          Biochar can improve soil properties, including water retention. It enhances water-holding capacity in sandy
          soils
          and drainage in clay soils by creating a more complex porous system for water movement. However, this simplified
          model should be used as a quick understanding of the potential of biochar for water retention, but not as a
          design
          guide for biochar application. The specific effects depend on biochar type, amount, soil characteristics, and
          environmental factors.
          <br />
          Careful consideration of these factors is necessary for achieving desired outcomes in soil improvement and
          sustainable agriculture.
        </p>
      </div>
      <div class="col">
        <form>
          <label class="center">
            <span class="label-text">
              Select soil type
            </span>
            <span class="input-control">
              <select v-model="selectedSoilType">
                <option selected></option>
                <option v-for="(tk, tn) in textures" :key="tn" :value="tk" :disabled="!tk">{{ tn }}</option>
              </select>
            </span>
          </label>
          <label class="center">
            <span class="label-text">
              Hectars
            </span>
            <span class="input-control">
              <input type="number" step=".1" v-model="hectars" />
              <span class="unit-measure">ha</span>
            </span>
          </label>
          <label class="center">
            <span class="label-text">
              Tillage depth
            </span>
            <span class="input-control">
              <input type="number" step=".1" v-model="tillageDepth" />
              <span class="unit-measure">cm</span>
            </span>
          </label>
          <label class="center">
            <span class="label-text">
              Tons of biochar
            </span>
            <span class="input-control">
              <input type="number" step=".1" v-model="tons" />
              <span class="unit-measure">T</span>
            </span>
          </label>
          <label class="center">
            <span class="label-text">
              Particle size of biochar
            </span>
            <span class="input-control">
              <select v-model="selectedParticleSizes">
                <option v-for="ps in particleSizes" :key="ps" :value="ps">{{ ps }}</option>
              </select>
            </span>
          </label>
        </form>
      </div>
    </div>
  </div>
  <div id="modelResults" class="container fill" style="text-align: center;" v-if="biocharApplicationRate != null">
    <strong>Results</strong>
    <ul>
      <li>Biochar application rate: {{ biocharApplicationRate }}%</li>
      <li><strong>Plant Available Water (PAW):</strong></li>
      <li>Without biochar: 3%</li>
      <li>With biochar: {{ rate }}%</li>
    </ul>
    <v-chart :option="chartOptions" autoresize></v-chart>
  </div>
</template>
<script lang="ts" src="./App.ts" />
