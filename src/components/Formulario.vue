<script setup>
import { reactive, ref } from "vue";
import Alerta from './Alerta.vue';

const paises = [
  { codigo: "ES", nombre: "España" },
  { codigo: "US", nombre: "Estados Unidos" },
  { codigo: "MX", nombre: "México" },
  { codigo: "AR", nombre: "Argentina" },
  { codigo: "CO", nombre: "Colombia" },
  { codigo: "CR", nombre: "Costa Rica" },
  { codigo: "PE", nombre: "Perú" },
];

const busqueda = reactive({
  ciudad: "",
  pais: "",
});

const error = ref("");

const emit = defineEmits(['obtener-clima']);

const consultatClima = () => {
  if (Object.values(busqueda).includes("")) {
    error.value = "Todos los campos son obligatorios";
    return;
  }

  error.value = "";

  emit('obtener-clima', busqueda);
};
</script>

<template>
  <form @submit.prevent="consultatClima" class="formulario">
    <Alerta v-if="error">{{ error }}</Alerta>

    <!-- Ciudad -->
    <div class="campo">
      <label for="ciudad">Ciudad</label>

      <input
        id="ciudad"
        type="text"
        placeholder="Una Ciudad"
        v-model="busqueda.ciudad"
      />
    </div>

    <!-- País -->
    <div class="campo">
      <label for="pais">País</label>

      <select id="pais" v-model="busqueda.pais">
        <option value="">-- Seleccione un País --</option>
        <option v-for="pais in paises" :value="pais.codigo">
          {{ pais.nombre }}
        </option>
      </select>
    </div>

    <input type="submit" value="Consultar Clima" />
  </form>
</template>
