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
            <Popper>
              <span>Inflow</span>
              <br />
              <small>
                Daily volume of water entering the wetland.
              </small>
              <template #content>
                <div>
                  The inflow can vary depending on the season and whether the water is pumped into the wetland or flows
                  directly from the surface (runoff).
                  <hr />
                  How to calculate the flow in cubic meters per day?
                  <ol>
                    <li>Choose Measurement Location.</li>
                    <li>Select a representative section of the channel.</li>
                    <li>Measure Cross-Section: Determine the width and depth of the channel to calculate the
                      cross-sectional
                      area.</li>
                    <li>Measure Flow Velocity: Use the float method or a flowmeter to measure the water's speed at the
                      same
                      section.</li>
                    <li>Calculate Discharge: Multiply the cross-sectional area by the flow velocity to find the discharge
                      in
                      cubic meters per second (m³/s).</li>
                    <li>onvert to Daily Flow: To get the flow in cubic meters per day, multiply the discharge in m³/s by
                      86,400 (the number of seconds in a day)</li>
                  </ol>
                </div>
              </template>
            </Popper>
          </span>
          <span class="input-control">
            <input type="number" step=".01" v-model="inputParameters.Q" />
            <span class="unit-measure">m<sup>3</sup>/d</span>
          </span>
        </label>
        <label>
          <span class="label-text">

            <Popper>
              <span>Concentration of total nitrogen</span>
              <br />
              <small>
                Concentration of total nitrogen (TN) in the water coming in the wetland.
              </small>
              <template #content>
                <div>
                  <ul>
                    <li>Low: 1 to 10 mg/L. Occurs in areas with effective nutrient management, minimal fertilizer use, and
                      good erosion control.</li>
                    <li>Moderate: 10 to 30 mg/L. Common in regions with moderate agricultural activity and standard
                      nutrient management practices.</li>
                    <li>High: > 30 mg/L. Found in areas with intensive agriculture, excessive fertilizer use, and
                      inadequate erosion control.</li>
                  </ul>
                  <hr />
                  If you're unsure about the total nitrogen concentration in runoff water, consider reaching out to your
                  local authorities, your consortium, or a local consultant for guidance.
                  <br />
                  This model does not differentiate between specific nitrogen components, such as ammonium, nitrate,
                  or organic nitrogen.
                  <br />
                  More considerations about TN concentration:
                  <ul>
                    <li>
                      Dilution Effect: Rainfall dilutes TN concentrations by adding a large volume of water to runoff,
                      spreading out the nitrogen content.
                    </li>
                    <li>Erosion: Rainfall can lead to soil erosion, increasing TN concentrations in runoff, especially
                      without proper erosion control.
                    </li>
                    <li>
                      Timing: Timing matters; rain shortly after fertilizer application can result in higher TN runoff as
                      Fnitrogen may not have been absorbed or incorporated yet.
                    </li>
                  </ul>
                </div>
              </template>
            </Popper>
          </span>
          <span class="input-control">
            <input type="number" step=".01" v-model="inputParameters.Ci" />
            <span class="unit-measure">mg/l</span>
          </span>
        </label>
        <label>
          <span class="label-text">
            <Popper>
              <span>Available area</span>
              <br />
              <small>
                Area available to build a constructed wetland.
              </small>
              <template #content>
                <div>
                  <ol>
                    <li>Smaller actual area: Note that the actual surface area of the wetland will be slightly smaller
                      than the total available area because there will be space at the wetland's edges and between
                      meanders, especially if choosing a compact and elongated shape.
                      <br />
                      As a reference, you can extract 5-15% of the available area.
                    </li>
                    <li>Location: Remember that the wetland can have a square shape or be more elongated, like the field
                      boundaries, depending on the available land.
                      <br />
                      The wetland should also be located in a low-lying area
                      where runoff water can ideally reach it by gravity.
                    </li>
                  </ol>
                </div>
              </template>
            </Popper>
          </span>
          <span class="input-control">
            <input type="number" step="1" v-model="inputParameters.A" />
            <span class="unit-measure">m<sup>2</sup></span>
          </span>
        </label>
        <!-- <label>
          <span class="label-text">
            Apparent number of Tanks in series (P)
          </span>
          <span class="input-control">
            <input type="number" step="1" v-model="inputParameters.P" />
            <span class="unit-measure"></span>
          </span>
        </label> -->
        <label>
          <span class="label-text">
            <Popper>
              <span>Water depth</span>
              <br />
              <small>
                Refers to the average depth of the wetland.
              </small>
              <template #content>
                <div>
                  It is used to calculate the available volume for water retention.
                  <br />
                  For effective total nitrogen removal, it is recommended to keep the wetland depth in the range of 0.4 to
                  0.8 meters.
                  <hr />
                  If the primary goal is water retention, the wetland can be deeper than 0.8 meter.
                  <br />
                  Making the bottom impermeable helps retain water effectively, but if you also want to boost soil
                  moisture around or help recharge the aquifer, consider using materials in the walls and bottom that
                  allow slow water seepage.
                </div>
              </template>
            </Popper>
          </span>
          <span class="input-control">
            <input type="number" step=".01" min=".01" v-model="inputParameters.h" />
            <span class="unit-measure">m</span>
          </span>
        </label>
        <label>
          <span class="label-text">
            <Popper>
              <span>Shape</span>
              <br />
              <small>
                This parameter defines the shape of the wetland.
              </small>
              <template #content>
                <div>
                  We can classify it into three groups:
                  <ol>
                    <li>Short: A wetland with width and length that are about the same. This shape is the most effective
                      for water retention because it minimizes the surface area available for water infiltration.</li>
                    <li>Medium: The length of the wetland ranges from 2 to 10 times its width. </li>
                    <li>Long: Elongated wetlands have a length that is more than 10 times their width. The elongated shape
                      is the most effective for treating total nitrogen.</li>
                  </ol>
                  <hr />
                  The shape parameter is linked to the residence time distribution, where "1" would simulate complete
                  mixing in a single tank and a large number a plug-flow behaviour.
                </div>
              </template>
            </Popper>
          </span>
          <span class="input-control">
            <!-- <input type="number" step="1" v-model="inputParameters.N" /> -->
            <select v-model="inputParameters.N">
              <option value="2">short</option>
              <option value="6">medium</option>
              <option value="14">long</option>
            </select>
            <span class="unit-measure"></span>
          </span>
        </label>
        <!-- <label>
          <span class="label-text">
            Background concentration of Total Nitrogen (Cb)
          </span>
          <span class="input-control">
            <input type="number" step=".01" v-model="inputParameters.Cb" />
            <span class="unit-measure">mg/l</span>
          </span>
        </label> -->
      </form>
    </div>
    <div id="modelResults" class="container">
      <v-chart :option="chartOptions"></v-chart>
    </div>
  </template>
</template>
<script lang="ts" src="./App.ts"></script>
<style>
:root {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>