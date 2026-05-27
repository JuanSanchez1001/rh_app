<script setup>
import { reactive, ref, onMounted } from 'vue';
import { BContainer, BRow, BCol, BButton, BFormCheckbox } from 'bootstrap-vue-next';
import api from '@/js/global';
import Swal from 'sweetalert2';
import { VueDatePicker } from '@vuepic/vue-datepicker';
const hoy = new Date().toLocaleDateString();
// let checkVacaciones = ref(0);

const arr_motivos = ref([]);
// const id_user = ref('');
const date1 = ref('');

const ausenciaForm = reactive({
    nomina: "",
    motivo: "",
    vacacionesFlag: 0,
    telefono: "",
    diasQTY: "",
    fecha_ini: "",
    fecha_fin:"",
    descripcion: ""
});

const usuarioInfterface = reactive({
    nomina: "",
    nombre: "",
    departamento: "",
    rol: "",
    supervisor: ""
})
//1.40 -> maq 53 prensa progresiva
async function getUserByNomina() {
    try{
        const response = await api.get(`/usuarios/usuario/${usuarioInfterface.nomina}`);
        // console.log(response.data[0]);
        let data = response.data[0];
        ausenciaForm.nomina = data.nomina;
        usuarioInfterface.nombre = data.nombre;
        usuarioInfterface.departamento = data.departamento;
        usuarioInfterface.rol = data.rol;
        usuarioInfterface.supervisor = data.supervisor;
    }catch(err){
        console.error(err)
    }
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
        })
    }
}

const calculateDays = (fechas) => {
    // console.log(fechas)
    let fecha1 = fechas[0];
    let fecha2 = fechas[1];
    // console.log(fechas[0].getDate());

    ausenciaForm.fecha_ini = fechas[0].getFullYear() + "-" + 
                            ((fechas[0].getMonth()+1) < 10 ? "0" + (fechas[0].getMonth()+1) : (fechas[0].getMonth()+1)) + "-" + 
                            (fechas[0].getDate() < 10 ? "0" + fechas[0].getDate() : fechas[0].getDate()); //getMoth returns 0, 11 moths jiji ojito Juanpiboys

    ausenciaForm.fecha_fin = fechas[1].getFullYear() + "-" + 
                            ((fechas[1].getMonth()+1) < 10 ? "0" + (fechas[1].getMonth()+1) : (fechas[1].getMonth()+1)) + "-" + 
                            (fechas[1].getDate() < 10 ? "0" + fechas[1].getDate(): fechas[1].getDate());

    // console.log("Fecha ini", ausenciaForm.fecha_ini);
    // console.log("Fecha fin", ausenciaForm.fecha_fin);

    ausenciaForm.diasQTY = (((fecha2-fecha1) / 3600000)/24) + 1;
}

async function sendFormularioAusencia() {
    try{
         console.log(ausenciaForm);
        const response = await api.post('/incidencia/incidencia_ausencia', ausenciaForm);
            Swal.fire({
                title: "Success",
                text: "Se creo la solicitud de ausencia. Espera autorización",
                icon: "success",
                showConfirmButton: true
            }).then((result) => {
                if(result.isConfirmed)
                {
                    window.location.reload();
                }       
            });
    }catch(err){
        if(err.response){
            errorMessages("Advetencia", err.response.data.error, "warning");
        }else {
            errorMessages("Error", "Se produjo un error", "error")
        }
        console.log(err)
    }
}
function errorMessages(titulo, texto, icon){
        Swal.fire({
            title: titulo,
            text: texto,
            icon: icon
        });
    }

onMounted( () => {
    getMotivos(1)
});
</script>
<template>
    <b-container fluid>
        <b-container class="mb-3">
            <b-row class="align-content-md-center">
                <b-col cols="6" class="d-flex justify-content-center align-items-center">
                    <div class="input-group">
                        <label class="label" for="input">No Nomina:</label>
                        <input class="input text-center" name="input" placeholder="Digita tu nomina..." type="text" style="width: 40%;" v-model="usuarioInfterface.nomina">
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
                        <input class="input" name="input" v-model="ausenciaForm.nomina" placeholder="" type="text" />
                    </div>
                </b-col>
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Nombre:</label>
                        <input class="input" name="input" placeholder="" type="text" v-model="usuarioInfterface.nombre" />
                    </div>
                </b-col>
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Area:</label>
                        <input class="input" name="input" placeholder="" type="text" v-model="usuarioInfterface.departamento" />
                    </div>
                </b-col>
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Puesto:</label>
                        <input class="input" name="input" placeholder="" type="text" v-model="usuarioInfterface.rol" />
                    </div>
                </b-col>
                <b-col class="mb-3" cols="4">
                    <div class="input-group">
                        <label class="label" for="input">Jefe directo:</label>
                        <input class="input" name="input" placeholder="" type="text" v-model="usuarioInfterface.supervisor" />
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
                    <h4>Datos de solicitud</h4>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col class="d-flex justify-content-center" cols="6">
                    <div class="input-group">
                        <label for="" class="label">Motivo:</label>
                        <select name="" id="" class="custom-select" v-model="ausenciaForm.motivo">
                            <option value="">--Selecciona un motivo--</option>
                            <option :value="index.id" v-for="index in arr_motivos">{{ index.descripcion }}</option>
                        </select>
                    </div>
                </b-col>
                <b-col class="" cols="2">
                    <div class="input-group">
                        <label for="" class="label">Usa vacaciones</label>
                    </div>
                    <b-form-checkbox id="" v-model="ausenciaForm.vacacionesFlag" value="1" unchecked-value="0"></b-form-checkbox> 
                    <span class="checkbox-text" v-if="ausenciaForm.vacacionesFlag == 1">Si</span>
                    <span class="checkbox-text" v-else-if="ausenciaForm.vacacionesFlag == 0"> No</span>
                </b-col>
                <b-col class="d-flex justify-content-center" cols="4">
                    <div class="input-group">
                        <label for="" class="label">Telefono</label>
                        <input type="text" class="input" v-model="ausenciaForm.telefono" placeholder="Escriba un telefono de emergencia">
                    </div>
                </b-col>
                <!--<b-col class="d-flex justify-content-center" cols="3">
                    <div class="input-group">
                        <label for="" class="label">Dias de ausencia</label>
                        <input type="text" class="input" v-model="ausenciaForm.diasQTY">
                    </div>
                </b-col>-->
            </b-row>
            <b-row class="mb-3">
                <b-col class="d-flex justify content-center" cols="8">
                    <div class="input-group">
                        <label for="" class="label">Fechas de ausencia</label>
                        <!-- <input type="date" class="input" v-model="ausenciaForm.fecha_ini" v-on:change="calculateDays"> -->
                        <VueDatePicker @update:model-value="calculateDays" v-model="date1" :range="{ noDisabledRange: false }" :time-config="{ enableTimePicker: false }" :formats="{ input: 'dd/MM/yyyy' }"></VueDatePicker>
                    </div>
                </b-col>
                <!-- <b-col class="d-flex justify content-center" cols="5">
                    <div class="input-group">
                        <label for="" class="label">Fecha regreso</label>
                        <input type="date" class="input" v-model="ausenciaForm.fecha_fin" v-on:change="calculateDays">
                        <VueDatePicker @update:model-value="calculateDays" v-model="ausenciaForm.fecha_fin" :formats="{preview: 'dd/MM/yyyy'}" :time-config="{ enableTimePicker: false }"></VueDatePicker>
                        
                    </div>
                </b-col> -->
                <b-col class="d-flex justify content-center" cols="4">
                    <div class="input-group">
                        <label for="" class="label">Dias de ausencia</label>
                        <input type="text" class="input" v-model="ausenciaForm.diasQTY" disabled>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col class="d-flex justify-content-center" cols="12">
                    <div class="input-group">
                        <label for="" class="label">Comentarios:</label>
                        <textarea name="" id="" class="textarea" v-model="ausenciaForm.descripcion"></textarea>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                    <b-button variant="warning">Limpiar</b-button>
                    <b-button variant="success" v-on:click="sendFormularioAusencia">Generar</b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>
<style scoped>
.form-container{
 border: 2px solid red;
 border-radius: 8px;
 padding: 20px;   
}

</style>