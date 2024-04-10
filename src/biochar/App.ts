import { computed, defineComponent, provide, ref } from "vue";
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

import { profiles as dataset } from "./profiles";


use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);


//classi tessiturali
// Clay soils
// Silty soils
// Loamy soils <- medium textured
// Sandy soils
// Organic soils
const textures: Record<string, string | null> = {
  "Clay soils": null,
  "Silty soils": null,
  "Loamy soils": "medium",
  "Sandy soils": null,
  "Organic soils": null,
}

export default defineComponent({
  components: {
    VChart
  },
  setup() {
    provide(THEME_KEY, 'light');

    const selectedSoilType = ref("medium")
    const selectedParticleSizes = ref(null)
    const selectedRate = ref(null)

    const hectars = ref(null)
    const tillageDepth = ref(null)
    const tons = ref(null)

    const particleSizes = computed(() => Object.keys(dataset[selectedSoilType.value!] || {}))
    const rates = computed(() => selectedSoilType.value && selectedParticleSizes.value ? Object.keys(dataset[selectedSoilType.value][selectedParticleSizes.value] || {}) : null)
    const result = computed(() => selectedSoilType.value && selectedParticleSizes.value && selectedRate.value ? dataset[selectedSoilType.value][selectedParticleSizes.value][selectedRate.value] : null)

    const biocharApplicationRateValue = computed(() => {
      if (!tons.value || !tillageDepth.value || !hectars.value || !selectedParticleSizes.value) return null;
      return tons.value / (1.5 * 100 * tillageDepth.value * hectars.value);
    })

    const biocharApplicationRate = computed(() => biocharApplicationRateValue.value ? (Math.round(biocharApplicationRateValue.value * 100 * 10) / 10) : null);

    const rate = computed(() => {
      if (!biocharApplicationRateValue.value || !selectedParticleSizes.value) return 3;
      const v = ((selectedParticleSizes.value * -0.01231) + (100 * biocharApplicationRateValue.value * 0.008605) + 0.054516) * 100;
      return Math.round(v * 1000) / 1000;
    });


    const chartOptions = computed(() => ({
      xAxis: {
        type: 'category',
        name: 'biochar application rate (%)',
        nameLocation: 'center',
        data: [0, biocharApplicationRate.value]
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          nameLocation: 'middle',
          nameGap: 30,
          name: 'plant available water content',
        }
      ],
      color: '#BF9000',
      series: [{
        type: 'bar',
        // lineStyle: { color: '#BF9000' },
        data: [3, rate.value]
      }]
    }));


    return {
      textures,
      selectedSoilType,
      particleSizes,
      selectedParticleSizes,
      rates,
      selectedRate,
      result,
      hectars,
      tillageDepth,
      tons,
      biocharApplicationRate,
      biocharApplicationRateValue,
      rate,
      chartOptions
    }

  }
})