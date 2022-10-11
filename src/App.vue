<template>
  <div id="mapContainer" class="container">
    <div ref="mainMap" id="mainMap"></div>
  </div>
  <template v-if="!address">
    <div>
      &lt;&lt; --- choose a point in map
    </div>
  </template>
  <template v-else>
    <div id="formContainer" class="container">
      <h3>Address: <strong>{{ address || "--" }}</strong></h3>
      <table class="model-result-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Temperature <i>(°C)</i></th>
            <th>C out <i>(mg/l)</i></th>
            <th>Removal efficiency <i>%</i></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in alldata" :key="data.month">
            <td>{{ data.month }}</td>
            <td>{{ data.airt }}</td>
            <td>{{ data.cout }}</td>
            <td>{{ data.re }} %</td>
          </tr>
        </tbody>
      </table>
      <form>
        <label>
          <span class="label-text">
            Inflow (Q)
          </span>
          <span class="input-control">
            <input type="number" step=".01" v-model="inputParameters.Q" />
            <span class="unit-measure">m<sup>3</sup>/d</span>
          </span>
        </label>
        <label>
          <span class="label-text">
            Inlet concentration of Total Nitrogen (Ci)
          </span>
          <span class="input-control">
            <input type="number" step=".01" v-model="inputParameters.Ci" />
            <span class="unit-measure">mg/l</span>
          </span>
        </label>
        <label>
          <span class="label-text">
            Area (A)
          </span>
          <span class="input-control">
            <input type="number" step="1" v-model="inputParameters.A" />
            <span class="unit-measure">m<sup>2</sup></span>
          </span>
        </label>
        <label>
          <span class="label-text">
            Apparent number of Tanks in series (P)
          </span>
          <span class="input-control">
            <input type="number" step="1" v-model="inputParameters.P" />
            <span class="unit-measure"></span>
          </span>
        </label>
        <label>
          <span class="label-text">
            Background concentration of Total Nitrogen (Cb)
          </span>
          <span class="input-control">
            <input type="number" step=".01" v-model="inputParameters.Cb" />
            <span class="unit-measure">mg/l</span>
          </span>
        </label>
      </form>
    </div>
    <div id="modelResults" class="container">
      <!-- <Chart :size="{ width: 550, height: 400 }" :data="alldata" :direction="'horizontal'" :margin="{ top: 25 }" >

        <template #layers>
          <Grid stroke-dasharray="2,2" />
          <Line :data-keys="['month', 'airt']" :line-style="{stroke: '#00ff00'}"/>
          <LabelsLayer :data-keys="['month', 'airt']"  />
          <Line :data-keys="['month', 'cout']" :line-style="{stroke: '#ff0000'}" />
        </template>

      </Chart> -->
      <v-chart :option="chartOptions"></v-chart>
    </div>
  </template>
</template>
<script lang="ts" src="./App.ts"></script>