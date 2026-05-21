<script setup>
import { BTab,BTabs, BContainer, BRow, BCol } from 'bootstrap-vue-next';
import Navbar from '../components/Navbar.vue';

import Salidas from '@/components/Salidas.vue';
import Ausencias from '@/components/Ausencias.vue';
</script>
<template>
    <Navbar></Navbar>
    <!-- <Inicio></Inicio> -->
    <b-container class="mb-3">
        <b-row>
            <b-col class="mb-3 d-flex justify-content-center align-items-center">
                <h3>Crear Incidencia</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="mb-3">
                <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger" class="mb-3" justified>
                    <b-tab title="Salida" class="mb-3">
                        <div class="mt-4">
                            <salidas></salidas>
                        </div>
                    </b-tab>
                    <b-tab title="Ausencia">
                        <div class="mt-4">
                            <ausencias></ausencias>
                        </div>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
    </b-container>
</template>
<style scoped>

</style>