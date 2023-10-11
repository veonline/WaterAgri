import { defineComponent, onMounted, provide, reactive, ref, watch, watchEffect } from "vue";
import { THEME_KEY } from "vue-echarts";
import { createMap } from "../waterretention/utils";

export default defineComponent({
  setup() {
    provide(THEME_KEY, 'light')

    const mainMap = ref<HTMLDivElement>();
    const buttons = ref<HTMLDivElement>();
    const mapready = ref(false);
    let mapView: __esri.MapView = null!;


    onMounted(async () => {
      mapView = await createMap(mainMap.value!, false);
      // mapView.ui.remove("search");
      mapView.ui.add(buttons.value!, "top-trailing");
      console.debug("e", mapView.ui.components)
      mapready.value = true;
    });

    return {
      mainMap,
      buttons,
      mapready
    }
  }
});