import { computed, defineComponent, provide, ref } from "vue";
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

import { profiles } from "./profiles";

const places = Object.keys(profiles);

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default defineComponent({
  components: {
    VChart
  },
  setup() {
    provide(THEME_KEY, 'light');

    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    const selectedSeason = ref(null);
    const placeSelected = ref<string>("bologna")
    const dataset = computed(() => profiles[placeSelected.value])

    const soilType = {
      'Silty Clay Loam': 'SiCL',
      'Sandy Clay': 'SaC',
      'Clay': 'C',
      'Silt': 'Si',
      'Clay Loam': 'CL',
      'Silt Loam': 'SiL',
      'Sandy Clay Loam': 'SaCL',
      'Loam': 'L'
    }
    const selectedSoilType = ref('L');
    const colors: Record<string, string> = {
      'winter': '#37effc',
      'spring': '#11d614',
      'summer': '#f7fc5a',
      'autumn': '#d69b11'
    }
    const chartOptions = computed(() => ({
      tooltip: {
        trigger: 'axis',
        className: 'tracermethods-chart-tooltip'
      },
      legend: {
        data: seasons
      },
      xAxis: {
        type: 'value',
        position: 'top',
        nameLocation: 'center',
        nameGap: 30,
        min: (val: { min: number }) => Math.floor(val.min - 2),
        max: (val: { max: number }) => Math.ceil(val.max + 2)
      },
      yAxis: [
        {
          type: 'category',
          position: 'left',
          inverse: true,
          nameLocation: 'middle',
          nameGap: 30,
          name: "depth (cm)",
          data: dataset.value.depth,
          axisLine: { onZero: false },
          axisLabel: {
            interval: (index: number, value: number) => Math.floor(value) == value
          }
        }
      ],
      series: seasons.map(s => ({
        name: s,
        type: 'line',
        smooth: true,
        data: dataset.value[selectedSoilType.value][s],
        lineStyle: { color: colors[s] },
        itemStyle: { color: colors[s] }
      }))
    }));

    return {
      seasons,
      selectedSeason,
      soilType,
      selectedSoilType,
      chartOptions,
      places,
      placeSelected
    }

  }
});