<script setup>
import { onMounted, ref } from 'vue';
import { BOffcanvas, BNav, BNavItem } from 'bootstrap-vue-next';
import api from '@/js/global';  

defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

let nomina = localStorage.getItem('nomina');
const sidebar_menu = ref([])

async function getMainMenu() {
  if (nomina == undefined || nomina == "" || nomina == 404) {
  nomina = 0;
  }

  try{
    console.log(nomina);
    const response = await api.get(`/usuarios/menu/${nomina}`);
    sidebar_menu.value = response.data;
    //  console.log(response.data);
  }catch(err){
    console.error("Hubo un error", err);
  }
}

onMounted(() => {
  getMainMenu(nomina);
})
</script>

<template>
  <b-offcanvas :model-value="modelValue" 
    @update:model-value="val => emit('update:modelValue', val)"
    title="Sistema de Tickets" 
    placement="start">
    <div>
        <b-nav vertical class="w-100 text-center" v-for="index in sidebar_menu">
          <b-nav-item :href="index.url">{{ index.title }}</b-nav-item>
        </b-nav>
        <!--<b-nav vertical class="w-100 text-center" v-for="index in sidebar_menu">
          <b-nav-item>Iniciar sesion</b-nav-item>
          <b-nav-item>Inicio</b-nav-item>
          <b-nav-item>Reporte</b-nav-item>
          <b-nav-item>Cerrar sesion</b-nav-item>
        </b-nav>-->
    </div>
  </b-offcanvas>
</template>

<style scoped></style>