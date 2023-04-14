<template>
  <div class="container fill" id="formContainer">
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
          Particle size
        </span>
        <span class="input-control">
          <select v-model="selectedParticleSizes">
            <option v-for="ps in particleSizes" :key="ps" :value="ps">{{ ps }}</option>
          </select>
        </span>
      </label>
    </form>
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