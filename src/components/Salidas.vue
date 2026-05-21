<script setup>
import { BContainer, BRow, BCol, BFormCheckbox, BButton, BModal, BTable } from 'bootstrap-vue-next';
import { reactive, ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import api from '@/js/global';
import { VueDatePicker } from '@vuepic/vue-datepicker';

    const hoy = new Date().toLocaleDateString();
    let checkGoBack = ref(0)
    let acompananteFlag = ref(0);
    let acompananteModal = ref(false);
    let acompananteQTY = ref(0);

    const arr_motivos = ref([]);

    const columnas = [
        {key: "id", label: "#"},
        {key: "nomina", label: "No. nomina"}
        // {key: "nombre", label: "Acompañante"}
        // {key: "action", label: "Buscar"}
    ];
    const acompanantes = reactive([
        {id:"1",nomina: "", nombre: ""},
        {id:"2",nomina: "", nombre: ""},
        {id:"3",nomina: "", nombre: ""},
        {id:"4",nomina: "", nombre: ""},
        {id:"5",nomina: "", nombre: ""}
    ]);
    const salidaForm = reactive({
        nomina: "",
        auto: "",
        placa: "",
        motivo: "",
        acompanantesQTY: acompananteQTY,
        tel: "",
        regresa: checkGoBack,
        hora_salida: "",
        hora_regreso: "",
        lugar: "",
        descripcion: ""        
    });
    const acompanantesForm = reactive({
        acompanante1: 0,
        acompanante2: 0,
        acompanante3: 0,
        acompanante4: 0,
        acompanante5: 0
    });
    const usuarioInfterface = reactive({
        nomina: "",
        nombre: "",
        departamento: "",
        rol: "",
        supervisor: ""
    });

    async function getUserByNomina() {
        try{
            const response = await api.get(`/usuarios/usuario/${usuarioInfterface.nomina}`);
            // console.log(response.data[0]);
            let data = response.data[0];
            salidaForm.nomina = data.nomina;
            usuarioInfterface.nombre = data.nombre;
            usuarioInfterface.departamento = data.departamento;
            usuarioInfterface.rol = data.rol;
            usuarioInfterface.supervisor = data.supervisor;
        }catch(err){
            Swal.fire({
                title: "Advertencia",
                text: err.response.data.error,
                icon: "warning"
            });
            // console.log(err.response.data.error);
        }
    }

    function limpiaSolicitud(){
        salidaForm.nomina = "",
        salidaForm.auto = "",
        salidaForm.placa = "",
        salidaForm.motivo = "",
        salidaForm.acompanantesQTY = acompananteQTY,
        salidaForm.tel = "",
        salidaForm.regresa = checkGoBack,
        salidaForm.hora_salida = "",
        salidaForm.hora_regreso = "",
        salidaForm.lugar = "",
        salidaForm.descripcion = ""  
    }

    async function sendFormularioSalida(){
        salidaForm.hora_salida = salidaForm.hora_salida.hours + ":" + (salidaForm.hora_salida.minutes < 10 ? "0" + salidaForm.hora_salida.minutes: salidaForm.hora_salida.minutes)
        salidaForm.hora_regreso = salidaForm.hora_regreso.hours + ":" + (salidaForm.hora_regreso.minutes < 10 ? "0" + salidaForm.hora_regreso.minutes: salidaForm.hora_regreso.minutes)
        // console.log(salidaForm.hora_salida.hours + ":" + (salidaForm.hora_salida.minutes < 10 ? "0" + salidaForm.hora_salida.minutes: salidaForm.hora_salida.minutes));
        let dataSolicitud = {...salidaForm, ...acompanantesForm};
        console.log("combinando el merequengue", dataSolicitud);
        try{
            const response = await api.post('/incidencia/incidencia_salida', dataSolicitud);
            Swal.fire({
                title: "Success",
                text: "Se creo el pase de salida. Espera autorización",
                icon: "success"
            });
        }catch(err){
            
        }
    }
    async function closeModal(){
        acompanantes.values().forEach(element => {
            // console.log(element.id,element.nomina)
            acompanantesForm['acompanante'+element.id] = element.nomina;
        });
        acompananteModal.value=false;
    }
    function sumaAcompanantes(acompanate){
        if(acompanate != '') acompananteQTY.value += 1;
        else if(acompanate == '') acompananteQTY.value -= 1;
    }


    async function getMotivos(tipoIncidencia) {
        try{
            const response = await api.get('/incidencia/motivos', {
                params: { motivoidf: tipoIncidencia }
            })
            arr_motivos.value = response.data;
        }catch(err) {
            console.error(err)
            Swal.fire({
                title: "Error",
                text: "Se produjo un error, favor de reportarlo con IT.",
                icon: "error"
            });
        }
    }

    onMounted(() => {
        getMotivos(2)
    })
</script>
<template>
    <b-container fluid>
        <b-container class="mb-3">
            <b-row class="align-content-md-center">
                <b-col cols="6" class="d-flex justify-content-center align-items-center">
                    <div class="input-group">
                        <label class="label" for="input">No Nomina:</label>
                        <input class="input text-center" name="input" placeholder="" type="text" style="width: 40%;" v-model="usuarioInfterface.nomina">
                        <b-button variant="primary" v-on:click="getUserByNomina">Buscar</b-button>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="mb-3 form-container"> 
            <b-row class="mb-3">
                <b-col class="d-flex justify-content-center">
                    <h4>Datos del empleado</h4>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Fecha:</label>
                        <input class="input text-center" name="input" placeholder="" type="text" :value="hoy" disabled>
                    </div>
                </b-col>
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Nomina:</label>
                        <input class="input" name="input" placeholder="" type="text" v-model="salidaForm.nomina" readonly />
                    </div>
                </b-col>
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Nombre:</label>
                        <input class="input" name="input" placeholder="" type="text" v-model="usuarioInfterface.nombre" disabled />
                    </div>
                </b-col>
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Area:</label>
                        <input class="input" name="input" placeholder="" type="text" v-model="usuarioInfterface.departamento" disabled />
                    </div>
                </b-col>
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Puesto:</label>
                        <input class="input" name="input" placeholder="" type="text" v-model="usuarioInfterface.rol" disabled />
                    </div>
                </b-col>
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Jefe directo:</label>
                        <input class="input" name="input" placeholder="" type="text" v-model="usuarioInfterface.supervisor" disabled />
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3 text-center">
                <span class="warning-message">¡Recuerda validar que tu información sea correcta!</span>
                <span class="warning-message">Estos datos deben de estar registrados. Sino apareces favor de reportarlo a RH o IT.</span>
                <span class="warning-message">Llena la informacion solicitada. Los datos del empleado se cargan en automatico con la nomina</span>
            </b-row>
        </b-container>
        
        <b-container class="mb-3 form-container">
            <b-row class="mb-3">
                <b-col class="d-flex justify-content-center">
                    <h4>Datos pase</h4>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Tipo de auto</label>
                        <select name="" id="" class="custom-select" v-model="salidaForm.auto">
                            <option value="">--Selecciona el tipo de auto--</option>
                            <option value="1">NA</option>
                            <option value="2">Propio</option>
                            <option value="3">Empresa</option>
                        </select>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Placas</label>
                        <input type="text" class="input" v-model="salidaForm.placa" placeholder="Escriba las placas">
                    </div>
                </b-col>
                <b-col class="">
                    <div class="input-group">
                        <label class="label" for="input">Motivo:</label>
                        <select name="" id="" class="custom-select" v-model="salidaForm.motivo">
                            <option value="">--Selecciona un motivo--</option>
                            <option :value="index.id" v-for="index in arr_motivos"> {{ index.descripcion }} </option>
                        </select>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="mb-3">
                    <div class="input-group">
                        <label for="" class="label">Acompañantes</label>
                        <b-form-checkbox v-model="acompananteFlag" value="1" unchecked-value="0"></b-form-checkbox>
                        <span class="checkbox-text" v-if="acompananteFlag == 1">Si</span>
                        <span class="checkbox-text" v-else-if="acompananteFlag== 0">No</span>
                        <input type="text" class="input" style="width: 70%;" v-model="acompananteQTY">
                        <b-button variant="primary" v-on:click="acompananteModal = !acompananteModal"><i class="bi bi-person-plus"></i></b-button>
                    </div>
                </b-col>
                <b-col class="mb-3">
                    <div class="input-group">
                        <label for="" class="label">Tel de contacto</label>
                        <input type="text" class="input" v-model="salidaForm.tel" placeholder="Escriba un telefono de contacto">
                    </div>
                </b-col>
                <b-col class="mb-3">
                    <div class="input-group">
                        <label for="" class="label">Regresa</label>
                    </div>
                    <b-form-checkbox id="" v-model="checkGoBack" value="1" unchecked-value="0"></b-form-checkbox> 
                    <span class="checkbox-text" v-if="checkGoBack == 1">Regresa</span>
                    <span class="checkbox-text" v-else-if="checkGoBack== 0"> No regresa</span>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Hora de salida</label>
                        <!-- <input type="text" class="input" v-model="salidaForm.hora_salida"> -->
                        <VueDatePicker v-model="salidaForm.hora_salida" time-picker></VueDatePicker>
                        
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Hora de regreso</label>
                        <!-- <input type="text" class="input" v-model="salidaForm.hora_regreso"> -->
                        <VueDatePicker v-model="salidaForm.hora_regreso" time-picker></VueDatePicker>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col class="">
                    <div class="input-group">
                        <label class="label" for="input">A donde vas:</label>
                        <textarea name="" id="" class="textarea" v-model="salidaForm.lugar" placeholder="A donde se dirige"></textarea>
                    </div>
                </b-col>
                <b-col class="">
                    <div class="input-group d-flex justify-content-center">
                        <label class="label" for="input">Descripcion:</label>
                        <textarea name="" id="" class="textarea" v-model="salidaForm.descripcion" placeholder="Escriba una breve descripcion"></textarea>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                    <b-button variant="warning" v-on:click="limpiaSolicitud()">Limpiar</b-button>
                    <b-button variant="success" v-on:click="sendFormularioSalida()">Generar</b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-container>


    <!--Modal para acompañantes-->
    <b-modal v-model="acompananteModal">
            <template #header>
                <b-container class="d-flex justify-content-center align-items-center">
                    <h4>Acompañantes <span><i class="bi bi-person-plus-fill"></i></span></h4>
                </b-container>
            </template>
            <b-container>
                <b-row>
                    <b-col>
                        <b-table :items="acompanantes" :fields="columnas" style="table-layout: fixed;">
                            <template #cell(nomina)="data">
                                <input type="text" class="input" placeholder="Nomina acompañante" v-on:change="sumaAcompanantes(data.item.nomina)" v-model="data.item.nomina">
                            </template>
                            <!-- <template #cell(action)="data">
                                <b-button variant="warning"><i class="bi bi-search"></i></b-button>
                            </template> -->
                        </b-table>
                    </b-col>
                </b-row>
            </b-container>

            <template #footer>
                <b-button variant="success" v-on:click="closeModal">Guardar</b-button>
            </template>
    </b-modal>
</template>
<style scoped>
.form-container{
 border: 2px solid red;
 border-radius: 8px;
 padding: 20px;   
}
</style>