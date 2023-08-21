<script setup>
import useClima from "../composables/useClima";
const { formatearTemperatura } = useClima();

defineProps({
  clima: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="resultado">
    <h2>Temperatura Actual</h2>
    <p class="actual">{{ formatearTemperatura(clima.main.temp) }}&deg;C</p>
    <div class="temperaturas">
      <p>Mínima: <span>{{ formatearTemperatura(clima.main.temp_min) }}&deg;C</span></p>
      <p>Máxima: <span>{{ formatearTemperatura(clima.main.temp_max) }}&deg;C</span></p>
    </div>
  </div>
</template>
