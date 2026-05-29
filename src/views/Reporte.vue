<script setup>
import { BContainer, BCol, BRow } from 'bootstrap-vue-next';
import api from '@/js/global';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { ref } from 'vue';

const dateRange = ref();
</script>
<template>
    <b-container>
        <b-row>
            <b-col>
                <h1 class="d-flex justify-content-center align-items-center">Reporte de incidencias</h1>
            </b-col>
        </b-row>
    </b-container>

    <b-container>
        <b-row>
            <b-col>
                <div class="input-group">
                    <label for="" class="label">Fechas</label>
                    <VueDatePicker @update:model-value="calculateDays" v-model="dateRange" :range="{ noDisabledRange: false }" :time-config="{ enableTimePicker: false }" :formats="{ input: 'dd/MM/yyyy' }"></VueDatePicker>
                </div>
            </b-col>
            <b-col>
                <div class="input-group">
                    <label for="" class="label">Tipo de incidencia</label>
                    <select name="" id="" class="custom-select">
                        <option value="1">Salidas</option>
                        <option value="2">Ausencias</option>
                    </select>
                </div>
            </b-col>
            <b-col>
                <div class="input-group">
                    <label for="" class="label">Estatus</label>
                    <select name="" id="" class="custom-select">
                        <option value="0">Pendiente</option>
                        <option value="1">Aceptada</option>
                        <option value="2">Rechazada</option>
                    </select>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<style scoped></style>