<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted, reactive } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';
import { BTab,BTabs, BContainer, BRow, BCol,BButton, BModal, BFormCheckbox } from 'bootstrap-vue-next';
import api from '@/js/global';
import { VueDatePicker } from '@vuepic/vue-datepicker';

const modalSalida = ref(false);
const modalAusencia = ref(false);
const tabIndex = ref(0);
let id_incidencia = ref();
let autorizaIncidencia = ref(0);
let goceFlag = ref(0);
// let voboflag = ref(0);
let autorizaIncidencia1 = ref(0);
let goceFlag1 = ref(0);
let voboflag1 = ref(0);
let nomina = sessionStorage.getItem('nomina')

const columns = ref([
    {label: "ID", field: "v_id"},
    {label: "Nomina", field: "v_nomina"},
    {label: "Solicitante", field: "v_nombre"},
    {label: "Fecha de incidencia", field: "v_fecha"},
    {label: "Motivo", field: "v_motivo"},
    {label: "Estado", field: "v_estatus"},
    {label: "Accion", field: "action"}
]);
const arr_salidas = ref([]);
const arr_ausencias = ref([]);

const incidenciaInterface = reactive({
    nombre: "",
    motivo: "",
    goceFlag: 2,
    tipoAuto: "",
    placas: "",
    lugar: "",
    telefono: "",
    descripcion: "",
    observaciones: "",
    regresaFlag: "",
    acompanantesqty: "",
    hora_salida: "",
    hora_regreo: "",
    diasqty: "",
    fecha_ini: "",
    fecha_fin: "",
    autorizaFlag: 2,
    voboFlag: 2,
    vacacionesflag: 2,
    autorizaIncidencia: 2

});

const salidaForm = reactive({
    v_userModify: nomina,
    v_autorizaflag: incidenciaInterface.autorizaIncidencia,
    v_goceflag: incidenciaInterface.goceFlag,
    v_placas: incidenciaInterface.placas,
    v_horasalida: incidenciaInterface.hora_salida,
    v_horaregreso: incidenciaInterface.hora_regreo,
    v_regresaflag: incidenciaInterface.regresaFlag,
    v_observaciones: incidenciaInterface.observaciones
});
// const v_fecha1 = ref(incidenciaInterface.fecha_ini);

async function getIncidencias() {
    // console.log("Cambia: ", tabIndex.value);
    try{
        switch(tabIndex.value){
            case 0:
                const responseSalidas = await api.get('/incidencia/salidas');
                arr_salidas.value = responseSalidas.data;
                break;
            case 1:
                const responseAusencias = await api.get('/incidencia/ausencias');
                arr_ausencias.value = responseAusencias.data;
                break;
            default:
                break;
        }
    }catch(err){

    }
}
async function getIncidenciasByID(id) {
    try{
        // console.log("El id es_: ",id)
        id_incidencia.value = id;
        const response = await api.get(`/incidencia/incidencia/${id}`);
        // console.log("response goce", response.data[0].)
        // console.log("El autoriza es_: ",response.data[0].autorizaflga)
        // console.log("El id es_: ",id)
        incidenciaInterface.nombre = response.data[0].nombre;
        incidenciaInterface.motivo = response.data[0].motivo;
        incidenciaInterface.goceFlag = response.data[0].goceflag;
        incidenciaInterface.tipoAuto = response.data[0].tipoauto;
        incidenciaInterface.placas = response.data[0].placas;
        incidenciaInterface.lugar = response.data[0].lugar;
        incidenciaInterface.telefono = response.data[0].telefono;
        incidenciaInterface.descripcion = response.data[0].descripcion;
        incidenciaInterface.observaciones = response.data[0].observaciones;
        incidenciaInterface.regresaFlag = response.data[0].regresaflag;
        incidenciaInterface.acompanantesqty = response.data[0].acompanantesqty;
        incidenciaInterface.hora_salida = response.data[0].hora_salida;
        incidenciaInterface.hora_regreo = response.data[0].hora_regreo;
        incidenciaInterface.diasqty = response.data[0].diasqty;
        incidenciaInterface.fecha_ini = response.data[0].fecha_ini;
        incidenciaInterface.fecha_fin = response.data[0].fecha_fin;
        incidenciaInterface.autorizaFlag = response.data[0].autorizaflga;
        incidenciaInterface.voboFlag = response.data[0].voboflag;
    }catch(err){
        console.error(err);
    }
}

//Peticiones para actualizar
async function sendUpdateSalida() {
    // console.log(v_fecha1);
    try{
        const response = await api.put(`/incidencia/salida/${id_incidencia.value}`, salidaForm);
        console.log("Se actualizo");
    }catch(err){
        
    }
}
async function sendUpdateAusencia() {
    console.log("Goce: ",incidenciaInterface.goceFlag);
    console.log("aut: ",incidenciaInterface.autorizaFlag);
    console.log("vobo: ",incidenciaInterface.voboFlag);
    try{
        
        // const response = await api.put(`/incidencia/ausencia/${id_incidencia.value}`,{
        //     v_usermodify: nomina,
        //     v_autorizaflag: incidenciaInterface.autorizaIncidencia,
        //     v_voboflag: incidenciaInterface.voboFlag,
        //     v_goceflag: incidenciaInterface.goceFlag,
        //     v_vacacionesflag: incidenciaInterface.vacacionesflag,
        //     v_fechaini: incidenciaInterface.fecha_ini,
        //     v_fechafin: incidenciaInterface.fecha_fin,
        //     v_diasqty: incidenciaInterface.diasqty,
        //     v_observaciones: incidenciaInterface.observaciones
        // }
        // )
    }catch(err){

    }
}
onMounted (() => {
    // getAllIncidencias()
    getIncidencias()
})
</script>
<template>
    <Navbar></Navbar>

    <b-container class="mb-3">
        <b-row>Tabla de incidencias</b-row>

        <b-row>
            <b-col class="mb-3">
                <b-tabs v-model:index="tabIndex" @activate-tab="getIncidencias()">
                    <b-tab title="Salidas">
                        <vue-good-table :columns="columns" :rows="arr_salidas" :search-options="{enabled: true}" id="t-1">
                            <template #table-row="props" slot-scope="props">
                                <span v-if="props.column.field == 'action'">
                                    <b-button variant="primary" v-on:click="modalSalida = !modalSalida; getIncidenciasByID(props.row.v_id)"><i class="bi bi-pencil-square"></i></b-button>
                                </span>
                            </template>
                        </vue-good-table>
                    </b-tab>
                    <b-tab title="Ausencias">
                        <vue-good-table :columns="columns" :rows="arr_ausencias" :search-options="{enabled: true}" id="t-2">
                            <template #table-row="props" slot-scope="props">
                                <span v-if="props.column.field == 'action'">
                                    <b-button variant="primary" v-on:click="modalAusencia = !modalAusencia; getIncidenciasByID(props.row.v_id)"><i class="bi bi-pencil-square"></i></b-button>
                                </span>
                            </template>
                        </vue-good-table>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
    </b-container>

    <b-modal content-class="edit-modal" id="modal-scrollable modal-multi-2" scrollable title="" v-model="modalSalida" size="lg">
        <template #header>
            <b-container class="d-flex justify-content-center align-items-center">
                <h4>Editar solicitud {{ id_incidencia }}</h4>
            </b-container>
        </template>
        <b-container>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Nombre</label>
                        <input type="text" class="input" v-model="incidenciaInterface.nombre" disabled>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Auto</label>
                        <input type="text" class="input" v-model="incidenciaInterface.tipoAuto" disabled>
                         
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Placas</label>
                        <input type="text" class="input" v-model="incidenciaInterface.placas">
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Motivo</label>
                        <input type="text" class="input" v-model="incidenciaInterface.motivo" disabled>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Acompañantes</label>
                        <input type="text" class="input" v-model="incidenciaInterface.acompanantesqty" disabled>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Hora Salida</label>
                        <input type="text" class="input" v-model="incidenciaInterface.hora_salida">
                        <!-- <VueDatePicker v-model="incidenciaInterface.hora_salida" time-picker></VueDatePicker> -->

                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Hora Regreso</label>
                        <input type="text" class="input" v-model="incidenciaInterface.hora_regreo">
                        <!-- <VueDatePicker v-model="incidenciaInterface.hora_regreo" time-picker></VueDatePicker> -->

                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Con goce</label>
                        <!-- <input type="text" class="input" v-model="incidenciaInterface.goceFlag"> -->
                        <b-form-checkbox v-model="goceFlag" value="1" unchecked-value="0"></b-form-checkbox>
                        <span class="checkbox-text" v-if="goceFlag == 1">Si</span>
                        <span class="checkbox-text" v-else-if="goceFlag == 0">No</span>
                    </div>
                    </b-col>
                    <b-col>
                        <div class="input-group">
                            <label for="" class="label">Autoriza</label>
                            <!-- <input type="text" class="input" v-model="incidenciaInterface.autorizaFlag"> -->
                            <b-form-checkbox v-model="autorizaIncidencia" value="1" unchecked-value="0"></b-form-checkbox>
                            <span class="checkbox-text" v-if="autorizaIncidencia == 1">Si</span>
                            <span class="checkbox-text" v-else-if="autorizaIncidencia == 0">No</span>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Descripcion</label>
                        <textarea name="" id="" class="textarea" v-model="incidenciaInterface.descripcion" disabled></textarea>
                    </div>
                </b-col>
                
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Lugar</label>
                        <!-- <input type="text" class="input" v-model="incidenciaInterface.lugar"> -->
                         <textarea name="" id="" class="textarea" v-model="incidenciaInterface.lugar"></textarea>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Observaciones</label>
                        <!-- <input type="text" class="input" v-model="incidenciaInterface.observaciones"> -->
                        <textarea name="" id="" class="textarea" v-model="incidenciaInterface.observaciones"></textarea>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <template #footer>
            <b-button>Cancelar</b-button>
            <b-button variant="success" v-on:click="sendUpdateSalida">Editar</b-button>
        </template>
    </b-modal>
    <b-modal content-class="edit-modal" id="modal-scrollable modal-multi-2" scrollable title="" v-model="modalAusencia" size="lg">
        <template #header>
            <b-container class="d-flex justify-content-center align-items-center">
                <h4>Editar Ausencia {{ id_incidencia }}</h4>
            </b-container>
        </template>
        <b-container>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Nombre</label>
                        <input type="text" class="input" :value="incidenciaInterface.nombre" disabled>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Motivo</label>
                        <input type="text" class="input" :value="incidenciaInterface.motivo" disabled>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Telefono</label>
                        <input type="text" class="input" :value="incidenciaInterface.telefono">
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Desde</label>
                        <input type="text" class="input" :value="incidenciaInterface.fecha_ini">
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Hasta</label>
                        <input type="text" class="input" :value="incidenciaInterface.fecha_fin">
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Dias</label>
                        <input type="text" class="input" :value="incidenciaInterface.diasqty">
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">VoBo</label>
                        <!-- <input type="text" class="input" v-model="incidenciaInterface.voboFlag"> -->
                        <b-form-checkbox 
                            v-model="incidenciaInterface.voboFlag" 
                            value="1" 
                            unchecked-value="2"
                            button
                        ></b-form-checkbox>
                        <span class="checkbox-text" v-if="incidenciaInterface.voboFlag == 0"><i class="bi bi-exclamation-circle-fill"></i></span>
                        <span class="checkbox-text" v-if="incidenciaInterface.voboFlag == 1"><i class="bi bi-hand-thumbs-up"></i>Si</span>
                        <span class="checkbox-text" v-else-if="incidenciaInterface.voboFlag == 2"><i class="bi bi-emoji-frown"></i>No</span>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Con goce</label>
                        <!-- <input type="text" class="input" v-model="incidenciaInterface.goceFlag"> -->
                        <b-form-checkbox 
                            v-model="incidenciaInterface.goceFlag" 
                            value="1" 
                            unchecked-value="2"
                            button
                        ></b-form-checkbox>
                        <span class="checkbox-text" v-if="incidenciaInterface.goceFlag == 0"><i class="bi bi-exclamation-circle-fill"></i></span>
                        <span class="checkbox-text" v-if="incidenciaInterface.goceFlag == 1"><i class="bi bi-cash-coin"></i>Si</span>
                        <span class="checkbox-text" v-else-if="incidenciaInterface.goceFlag == 2"><i class="bi bi-emoji-frown"></i>No</span>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Autoriza</label>
                        <!-- <input type="text" class="input" v-model="incidenciaInterface.autorizaFlag"> -->
                         <b-form-checkbox 
                         v-model="incidenciaInterface.autorizaFlag" 
                         value="1" 
                         unchecked-value="2"
                         ></b-form-checkbox>
                        <span class="checkbox-text" v-if="incidenciaInterface.autorizaFlag == 1"><i class="bi bi-check-circle-fill"></i>Si</span>
                        <span class="checkbox-text" v-if="incidenciaInterface.autorizaFlag == 1"><i class="bi bi-check-circle-fill"></i>Si</span>
                        <span class="checkbox-text" v-else-if="incidenciaInterface.autorizaFlag == 2">No</span>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col cols="6">
                    <div class="input-group">
                        <label for="" class="label">Descripcion</label>
                        <textarea name="" id="" class="textarea" :value="incidenciaInterface.descripcion"></textarea>
                    </div>
                </b-col>
                <b-col cols="6">
                    <div class="input-group">
                        <label for="" class="label">Observaciones</label>
                        <!-- <input type="text" class="input" v-model="incidenciaInterface.observaciones"> -->
                         <textarea name="" id="" class="textarea" :value="incidenciaInterface.observaciones"></textarea>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <template #footer>
            <b-button>Cancelar</b-button>
            <b-button v-on:click="sendUpdateAusencia" variant="success">Editar</b-button>
        </template>
    </b-modal>
</template>
<style scoped>

</style>