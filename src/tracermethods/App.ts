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

import { profiles as dataset } from "./profiles";


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
    const selectedSeason = ref('winter');

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
    const selectedSoilType = ref(null);

    const chartOptions = ref({
      tooltip: {
        trigger: 'axis',
        formatter: '{c}'
      },
      xAxis: {
        type: 'value',
        position: 'top',
        name: computed(() => selectedSoilType.value ? Object.entries(soilType).find(([k, v]) => v == selectedSoilType.value)![0] : null),
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
          nameGap: 60,
          name: "depth (cm)",
          data: dataset.depth,
          axisLine: { onZero: false },
          axisLabel: {
            interval: (index: number, value: number) => Math.floor(value) == value
          }
        }
      ],
      series: [
        {
          type: 'line',
          smooth: true,
          data: computed(() => selectedSoilType.value ? dataset[selectedSoilType.value][selectedSeason.value] : [])
        }]
    });

    return {
      seasons,
      selectedSeason,
      soilType,
      selectedSoilType,
      chartOptions
    }

  }
});