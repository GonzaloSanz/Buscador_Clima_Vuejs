import { ref, computed } from 'vue';
import axios from "axios";

const clima = ref({});
const cargando = ref(false);
const error = ref('');


export default function useClima() {
  const obtenerClima = async ({ ciudad, pais }) => {
    cargando.value = true;
    clima.value = {};
    error.value = '';

    // Importar el API Key
    const key = import.meta.env.VITE_API_KEY;

    try {
      // Obtener la latitud y longitud (Geocoding API)
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`;

      const { data } = await axios(url);
      const { lat, lon } = data[0];

      // Obtener el clima (Current Weater Data API)
      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    
      const { data: resultado } = await axios(urlClima);
      console.log(resultado);
      
      clima.value = resultado;

    } catch {
      error.value = 'Ciudad No Encontrada';
    } finally {
      cargando.value = false;
    }
  };

  const mostrarClima = computed(() => {
    return Object.values(clima.value).length > 0;
  });

  const formatearTemperatura = (temperatura) => parseInt(temperatura - 273.15);

  return {
    obtenerClima,
    clima,
    mostrarClima,
    formatearTemperatura,
    cargando,
    error
  };
}
