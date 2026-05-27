<script setup>
import { BContainer, BCol, BRow, BButton } from 'bootstrap-vue-next';
import Navbar from '@/components/Navbar.vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';

const columns = ref([
    {label: 'Nomina', field: 'nomina'},
    {label: 'Nombre', field: 'nombre'},
    {label: 'Departamento', field: 'dept'},
    {label: 'Puesto', field: 'rol'},
    {label: 'Jefe Directo', field: 'supervisor'},
    {label: 'Correo Electronico', field: 'email'},
])

</script>
<template>
    <Navbar></Navbar>
    <b-container class="mb-3">
        <b-row>
            <b-col>
                <h1>Usuarios</h1>
            </b-col>
        </b-row>
    </b-container>
    <b-container class="mb-3">
        <b-row>
            <b-col>
                <b-button variant="success">Agregar</b-button>
            </b-col>
        </b-row>
    </b-container>

    <vue-good-table>

    </vue-good-table>
</template>
<style scoped></style>