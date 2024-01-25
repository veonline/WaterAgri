<template>
  <span :class="cls">{{ label }}</span>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'


// define prop solution
const props = defineProps<{ solution: AssessmentItem }>()

const label = ref('-')
const cls = ref('badge bg-primary')

if (props.solution) {

  let suitability = props.solution.suitability;
  console.log("suitability", suitability);

  if (suitability == 1) {
    label.value = 'Low';
    cls.value = 'badge bg-danger';
  }
  else if (suitability == 5) {
    label.value = 'Medium';
    cls.value = 'badge bg-warning';
  }
  else if (suitability == 10) {
    label.value = 'High';
    cls.value = 'badge bg-success';
  }

  cls.value += ' typ_' + props.solution.dim
  // classes.value=props.solution.classes
}

</script>

<style scoped>
.typ_gen {
  font-size: 1.1em;
}
</style>S