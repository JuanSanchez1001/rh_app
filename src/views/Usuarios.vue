<script setup>
import { onMounted, reactive, ref } from 'vue';
import api from '@/js/global';
import { BContainer, BCol, BRow, BButton, BModal } from 'bootstrap-vue-next';
import Navbar from '@/components/Navbar.vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';
import Swal from 'sweetalert2';

const userModal = ref(false);
let titleModal = "";

const columns = ref([
    {label: 'Nomina', field: 'nomina'},
    {label: 'Nombre', field: 'nombre'},
    {label: 'Departamento', field: 'dept'},
    {label: 'Puesto', field: 'rol'},
    {label: 'Jefe Directo', field: 'super'},
    {label: 'Correo Electronico', field: 'email'},
    {label: 'Editar', field: 'edit'},
]);
const arr_users = ref([]);
const arr_departamentos = ref([]);
const arr_puestos = ref([]);
const arr_roles = ref([]);

const userModel = reactive({
    nomina: "",
    nombre: "",
    ape_paterno: "",
    ape_materno: "",
    genero: "",
    correo: "",
    edad: "",
    username: "",
    superid: "",
    deparamento: "",
    puesto: "",
    rol: ""
});

//Functions inserts

//Functions GET
async function getUserByID(id) {
    
}

async function getAllUsers() {
    try{
        const response = await api.get('/usuarios/usuarios');

        arr_users.value = response.data;
        // console.log(response.data);
        // console.log("Hola");
    }catch(err){
        if(err.response.data){
            Swal.fire({
                title: "Advertencia",
                text: err.response.data.error,
                icon: "warning"
            });
        }else {
            Swal.fire({
                title: "Advertencia",
                text: "Se produjo un error",
                icon: "warning"
            });
        }
    }
}
async function getAllRol() {
    try{
        const response = await api.get('/usuarios/roles');
        arr_roles.value = response.data;
    }catch(err){
        if(err.response.data){
            Swal.fire({
                title: "Advertencia",
                text: err.response.data.error,
                icon: "warning"
            });
        }else {
            Swal.fire({
                title: "Advertencia",
                text: "Se produjo un error",
                icon: "warning"
            });
        }
    }
}
async function getAllDepartamentos() {
    try{
        const response = await api.get('/usuarios/departamentos');
        arr_departamentos.value = response.data;
    }catch(err){
        if(err.response.data){
            Swal.fire({
                title: "Advertencia",
                text: err.response.data.error,
                icon: "warning"
            });
        }else {
            Swal.fire({
                title: "Advertencia",
                text: "Se produjo un error",
                icon: "warning"
            });
        }
    }
}
async function getAllPuestos(){
    try{
        const response = await api.get('/usuarios/puestos');
        arr_puestos.value = response.data;
    }catch(err){
        if(err.response.data){
            Swal.fire({
                title: "Advertencia",
                text: err.response.data.error,
                icon: "warning"
            });
        }else {
            Swal.fire({
                title: "Advertencia",
                text: "Se produjo un error",
                icon: "warning"
            });
        }
    }
}
function modalTitle(type){
    switch(type){
        case 1:
            titleModal = "Crear Usuario";
            break;
        case 2:
            titleModal = "Editar Usuario";
            break;
        default:
            break;
    }
}
onMounted(() => {
    getAllUsers(),
    getAllDepartamentos(),
    getAllPuestos(),
    getAllRol()
});
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
                <b-button variant="success" v-on:click="userModal = !userModal; modalTitle(1);"><i class="bi bi-person-plus-fill"></i></b-button>
            </b-col>
        </b-row>
    </b-container>

    <vue-good-table :columns="columns" :rows="arr_users" :search-options="{enabled: true}">
        <template #table-row="props" slot-scope="props">
            <span v-if="props.column.field == 'edit'">
                <b-button variant="primary" v-on:click="userModal = !userModal; modalTitle(2);"><i class="bi bi-pencil"></i></b-button>
            </span>
        </template>
    </vue-good-table>
    <!-- ######## Modal ########-->
     <b-modal content-class="edit-modal" id="modal-scrollable modal-multi-2" v-model="userModal" size="xl" no-close-on-backdrop no-close-on-esc>
        <template #header>
            <b-container class="d-flex justify-content-center align-items-center mb-3">
                <h4> {{ titleModal }} </h4>
            </b-container>

        </template>
        <b-container class="mb-3">
            <b-row>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Nomina</label>
                        <input type="text" class="input" placeholder="Nomina..." v-model="userModel.nomina">
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Nombre</label>
                        <input type="text" class="input" placeholder="Nombre..." v-model="userModel.nombre">
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Apellido Paterno</label>
                        <input type="text" class="input" placeholder="Apellido Paterno..." v-model="userModel.ape_paterno">
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Apellido Materno</label>
                        <input type="text" class="input" placeholder="Apellido Materno..." v-model="userModel.ape_materno">
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Genero</label>
                        <select name="" id="" class="custom-select" v-model="userModel.genero">
                            <option value="F">Femenino</option>
                            <option value="M">Masculino</option>
                        </select>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Correo</label>
                        <input type="text" class="input" placeholder="Correo..." v-model="userModel.correo">
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Edad</label>
                        <input type="text" class="input" placeholder="Edad..." v-model="userModel.edad">
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Username</label>
                        <input type="text" class="input" placeholder="Username..." v-model="userModel.username">
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Jefe directo</label>
                        <input type="text" class="input" placeholder="Supervisor..." v-model="userModel.superid">
                        <b-button>Buscar</b-button>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Nombre</label>
                        <input type="text" class="input" disabled>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Departamento</label>
                        <select name="" id="" class="custom-select" v-model="userModel.deparamento">
                            <option v-for="index in arr_departamentos" :value="index.id"> {{ index.descripcion }} </option>
                        </select>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Cargo</label>
                        <select name="" id="" class="custom-select" v-model="userModel.puesto">
                            <option v-for="index in arr_puestos" :value="index.id"> {{ index.descripcion }} </option>
                        </select>
                    </div>
                </b-col>
                <b-col>
                    <div class="input-group">
                        <label for="" class="label">Rol</label>
                        <select name="" id="" class="custom-select" v-model="userModel.puesto">
                            <option v-for="index in arr_roles" :value="index.id"> {{ index.descripcion }} </option>
                        </select>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <template #footer>
            <b-button variant="" v-on:click="userModal = false">Cancelar</b-button>
            <b-button variant="success">Enviar</b-button>
        </template>
     </b-modal>
</template>
<style scoped></style>