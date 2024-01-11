<template>
  <div class="container fill" id="formContainer">
    <form>
      <label class="center">
        <span class="label-text">
          Select soil type
        </span>
        <span class="input-control">
          <select v-model="selectedSoilType">
            <option v-for="(tk, tn) in soilType" :key="tk" :value="tk">{{ tn }}</option>
          </select>
        </span>
      </label>
      <!-- <label class="center">
        <span class="label-text">
          Select season
        </span>
        <span class="input-control">
          <select v-model="selectedSeason">
            <option :value="null"></option>
            <option v-for="season in seasons" :key="season" :value="season">{{ season }}</option>
          </select>
        </span>
      </label> -->
    </form>
  </div>
  <div class="container fill" id="modelResults" v-if="selectedSoilType">
    <v-chart :option="chartOptions" autoresize></v-chart>
  </div>
</template>
<script lang="ts" src="./App.ts"></script>