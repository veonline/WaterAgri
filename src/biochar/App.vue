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
          Particle size
        </span>
        <span class="input-control">
          <select v-model="selectedParticleSizes">
            <option v-for="ps in particleSizes" :key="ps" :value="ps">{{ ps }}</option>
          </select>
        </span>
      </label>
      <label class="center">
        <span class="label-text">
          Rate
        </span>
        <span class="input-control">
          <select v-model="selectedRate">
            <option v-for="r in rates" :key="r" :value="r">{{ r }}</option>
          </select>
        </span>
      </label>
      <label class="center">
        <span class="label-text">
          Hectars
        </span>
        <span class="input-control">
          <input type="number" step=".1" v-model="hectars" />
          <!-- <span class="unit-measure">hA</span> -->
        </span>
      </label>
    </form>
  </div>
  <div id="modelResults" class="container fill" v-if="result" style="text-align: center;">
    <strong>Available water content</strong>
    <ul>
      <li>{{ result.percent }} %</li>
      <li>{{ (hectars ? result.aw * hectars : result.aw).toFixed(3) }} cm<sup>3</sup></li>
    </ul>
  </div>
</template>
<script lang="ts" src="./App.ts" />