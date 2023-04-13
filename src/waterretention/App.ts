import { computed, defineComponent, onMounted, provide, reactive, ref, watch } from "vue";

import { useGeolocation } from '@vueuse/core'
import { createMap, fetchMeteostatData, drawClickedPoint, IMeteostatData, getLocationText, inputParameters, calculateModel, calculateRemovalEfficiency, monthName } from "./utils";

// import { Chart, Grid, Line } from 'vue3-charts'


import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  // TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';


use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  LegendComponent,
  GridComponent
]);

export default defineComponent({
  components: {
    VChart
  },
  setup() {

    provide(THEME_KEY, 'light')

    const { coords, locatedAt, error } = useGeolocation()

    const mainMap = ref<HTMLDivElement>();

    let mapView: __esri.MapView = null!;

    const weatehrData = ref<IMeteostatData[]>();
    const address = ref<string>();

    onMounted(async () => {
      mapView = await createMap(mainMap.value!);
      // mapView.on("click", (e) => fetchMeteostatData(e.mapPoint.latitude, e.mapPoint.longitude));
      mapView.on("click", async (e) => {
        drawClickedPoint(e);
        weatehrData.value = await fetchMeteostatData(e.mapPoint.latitude, e.mapPoint.longitude);
        address.value = await getLocationText(e.mapPoint);
      });
    })

    const unwatchCoords = watch(coords, () => {
      mapView?.goTo({
        center: [coords.value.longitude, coords.value.latitude],
        zoom: 18
      }, {
        animate: true,
        duration: 1000
      }).then(unwatchCoords)
    })


    // const chartOptions = {
    //   responsive: true,
    //   maintainAspectRatio: false
    // }

    const alldata = computed(() => {
      return weatehrData.value?.map(wd => {
        return {
          month: monthName(wd.month),
          airt: wd.tavg,
          cout: calculateModel(wd.tavg!).value,
          re: calculateRemovalEfficiency(wd.tavg!).value
        }
      })
    });

    // const chartData = computed(() => {
    //   return {
    //     labels: computed(() => alldata.value?.map(x => x.month) || []).value,
    //     datasets: [
    //       {
    //         label: 'Air Temperature',
    //         backgroundColor: '#f87979',
    //         data: computed(() => alldata.value?.map(x => x.airt) || [])
    //       },
    //       {
    //         label: 'C out',
    //         backgroundColor: '#00fg34',
    //         data: computed(() => alldata.value?.map(x => x.cout) || [])
    //       },
    //     ]
    //   }
    // })

    const chartOptions = ref({
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: computed(() => alldata.value?.map(x => x.month) || []),
        axisLabel: {
          rotate: 30
        }
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          name: 'Air temp.'
        },
        {
          type: 'value',
          position: 'right',
          name: "C out"
        }
      ],
      legend: {
        orient: 'horizontal',
        left: 'left',
        data: [{
          name: 'Air temp.'
        }, {
          name: 'C out'
        }],
      },
      series: [
        {
          yAxisIndex: 0,
          name: 'Air temp.',
          type: 'line',
          data: computed(() => alldata.value?.map(x => x.airt) || [])
        },
        {
          yAxisIndex: 1,
          name: 'C out',
          type: 'line',
          data: computed(() => alldata.value?.map(x => x.cout) || [])
        }]
    });

    return {
      mainMap,
      address,
      inputParameters,
      alldata,
      // chartData,
      chartOptions,
    }
  }
})