<script setup>
import { reactive } from 'vue';
import { BContainer, BRow, BCol, BTab,BTabs, BCard, BButton } from 'bootstrap-vue-next';
import { useRouter } from 'vue-router';
import api from '@/js/global';
import Swal from 'sweetalert2';

const user = reactive({
    nomina: '',
    password: ''
});
const router = useRouter();

async function login() {
    try{
        // console.log("usuario: ", user);
        const response = await api.post('/login', user);
        console.log("La nomina: ",response.data[0].nomina);
        sessionStorage.setItem("nomina", response.data[0].nomina);
        sessionStorage.setItem("departamento", response.data[0].departamento);
        sessionStorage.setItem("rol", response.data[0].rol);
        router.push({name: 'inicio'});
        
    }catch(err){
        if(err.response){
        Swal.fire({
            title: "Error",
            text: err.response.data.mensaje,
            icon: "error"
        })
        }else {
            Swal.fire({
            title: "Error",
            text: "Hubo un favor de reportarlo a IT.",
            icon: "error"
        })
        }
      
        console.error("Se produjo un error", err)
    }
}
</script>

<template>
    <b-container>
        <b-row>
            <b-col class="mb-3 d-flex justify-content-center align-items-center">
                <h3>Inciar sesión</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="mb-3 d-flex justify-content-center align-items-center">
                <b-tabs content-class="mt-3">
                    <b-tab title="Log in">
                        <b-card>
                            <b-container>
                                <b-row>
                                    <b-col class="mb-3 d-flex justify-content-center align-items-center">
                                        <div class="input-group">
                                            <label for="" class="label">Nomina</label>
                                            <input type="text" class="input" placeholder="No nomina" v-model="user.nomina">
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col class="mb-3 d-flex justify-content-center align-items-center">
                                        <div class="input-group">
                                            <label for="" class="label">Password</label>
                                            <input type="password" class="input" placeholder="Contraseña" v-model="user.password">
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                            <template #footer>
                                <b-container class="d-flex justify-content-end align-items-end">
                                    <b-button variant="success" v-on:click="login">Login</b-button>
                                </b-container>
                            </template>
                        </b-card>
                    </b-tab>
                    <b-tab title="Crear Usuario">
    
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
    </b-container>
</template>

<style scoped></style>