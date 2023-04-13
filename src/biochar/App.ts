import { computed, defineComponent, ref } from "vue";

import { profiles as dataset } from "./profiles";


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
  setup() {

    const selectedSoilType = ref("")
    const selectedParticleSizes = ref(null)
    const selectedRate = ref(null)

    const hectars = ref(null)

    const particleSizes = computed(() => Object.keys(dataset[selectedSoilType.value!] || {}))
    const rates = computed(() => selectedSoilType.value && selectedParticleSizes.value ? Object.keys(dataset[selectedSoilType.value][selectedParticleSizes.value] || {}) : null)
    const result = computed(() => selectedSoilType.value && selectedParticleSizes.value && selectedRate.value ? dataset[selectedSoilType.value][selectedParticleSizes.value][selectedRate.value] : null)

    return {
      textures,
      selectedSoilType,
      particleSizes,
      selectedParticleSizes,
      rates,
      selectedRate,
      result,
      hectars
    }

  }
})