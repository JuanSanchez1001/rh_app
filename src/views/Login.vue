<script setup>
import { reactive, computed } from 'vue';
import { BContainer, BRow, BCol, BTab,BTabs, BCard, BButton } from 'bootstrap-vue-next';
import { useRouter } from 'vue-router';
import api from '@/js/global';
import Swal from 'sweetalert2';

const user = reactive({
    nomina: '',
    password: ''
});
const newPassword = reactive({
    nomina: "",
    newPassword: ""
});
const router = useRouter();

const tieneMinuscula = computed(() => /[a-z]/.test(newPassword.newPassword))
const tieneMayuscula = computed(() => /[A-Z]/.test(newPassword.newPassword))
const tieneNumero    = computed(() => /\d/.test(newPassword.newPassword))
const tieneEspecial  = computed(() => /[$@$!%*?&]/.test(newPassword.newPassword))
const longitudValida = computed(() => newPassword.newPassword.length >= 8 && newPassword.newPassword.length <= 15)

async function login() {
    try{
        // console.log("usuario: ", user);
        const response = await api.post('/login', user);
        // console.log("La nomina: ",response.data[0].nomina);
        localStorage.setItem("nomina", response.data[0].nomina);
        localStorage.setItem("departamento", response.data[0].departamento);
        localStorage.setItem("rol", response.data[0].rol);
        router.push({name: 'inicio'});
        
    }catch(err){
        if(err.response){
        Swal.fire({
            title: "Advertencia",
            text: err.response.data.error,
            icon: "warning"
        })
        }else {
            Swal.fire({
            title: "Error",
            text: "Hubo un favor de reportarlo a IT.",
            icon: "error"
        })
        }
      
        // console.error("Se produjo un error", err)
    }
}
async function changePassword() {
    // console.log(newPassword)
    try{
        const response = await api.put('/reset_password', {}, {
            params: newPassword
        });
        if(response.data.code == "REST_PASSWORD_FAIL"){
            Swal.fire({
            tite: "Advertencia",
            text: response.data.message,
            icon: "warning"
        });
        }else if(response.data.code == "REST_PASSWORD_SUCCESS"){
            Swal.fire({
                tite: "Exito",
                text: response.data.message,
                icon: "success"
            });
        }else {
            Swal.fire({
            tite: "Advertencia",
            text: "Ocurrio un problema",
            icon: "warning"
        });
        }
    }catch(err){
        if(err.response){
            Swal.fire({
                title: "Advertencia",
                text: err.response.data.error,
                icon: "warning"
            })
        }else {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema inesperado",
                icon: "error"
            })
        }
        // console.error("Se produjo un error", err)
    }
}

const bgRegla = (cumpleRegla) => {
  return cumpleRegla 
    ? 'bg-success bg-opacity-10 text-success' 
    : 'bg-danger bg-opacity-10 text-danger'
}

// Cambia el icono: círculo con paloma o círculo con X
const iconoRegla = (cumpleRegla) => {
  return cumpleRegla 
    ? 'bi bi-check-circle-fill' 
    : 'bi bi-x-circle-fill'
}
</script>

<template>
    <b-container class="container-title">
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
                    <b-tab title="Cambiar contraseña">
                        <b-container>
                            <b-row>
                                <b-col>
                                    <b-card>
                                       <b-container>
                                           <b-row>
                                               <b-col class="mb-3 d-flex justify-content-center align-items-center">
                                                   <div class="input-group">
                                                       <label for="" class="label">Nomina</label>
                                                       <input type="text" class="input" placeholder="No nomina" v-model="newPassword.nomina">
                                                   </div>
                                               </b-col>
                                           </b-row>
                                           <b-row>
                                               <b-col class="mb-3 d-flex justify-content-center align-items-center">
                                                   <div class="input-group">
                                                       <label for="" class="label">Nueva Contraseña</label>
                                                       <input type="password" class="input" placeholder="Contraseña" v-model="newPassword.newPassword">
                                                   </div>
                                               </b-col>
                                           </b-row>
                                       </b-container>
                                       <template #footer>
                                           <b-container class="d-flex justify-content-end align-items-end">
                                               <b-button variant="warning" v-on:click="changePassword">Actualizar</b-button>
                                           </b-container>
                                       </template>
                                   </b-card>
                                </b-col>
                                <b-col>
                                    <b-card 
                                        border-variant="light" 
                                        class="shadow-sm border-0 rounded-3 overflow-hidden bg-white"
                                        body-class="p-4"
                                        style="max-width: 450px;"
                                    >
                                        <div class="d-flex align-items-center mb-3">
                                        <div class="bg-primary bg-opacity-10 p-2 rounded-3 text-primary me-3">
                                            <i class="bi bi-shield-lock-fill fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 class="card-title mb-0 fw-bold text-dark">Seguridad de la Contraseña</h5>
                                            <small class="text-muted">Tu contraseña debe cumplir con lo siguiente:</small>
                                        </div>
                                        </div>

                                        <hr class="text-muted opacity-25 my-3">

                                        <b-container fluid class="px-0">
                                        <b-row class="g-2">
                                            
                                            <b-col cols="12" :class="['d-flex align-items-center p-2 rounded-2 transition-all', bgRegla(tieneMinuscula)]">
                                            <i :class="['fs-5 me-3', iconoRegla(tieneMinuscula)]"></i>
                                            <span class="small fw-medium">Al menos una letra minúscula</span>
                                            </b-col>

                                            <b-col cols="12" :class="['d-flex align-items-center p-2 rounded-2 transition-all', bgRegla(tieneMayuscula)]">
                                            <i :class="['fs-5 me-3', iconoRegla(tieneMayuscula)]"></i>
                                            <span class="small fw-medium">Al menos una letra mayúscula</span>
                                            </b-col>

                                            <b-col cols="12" :class="['d-flex align-items-center p-2 rounded-2 transition-all', bgRegla(tieneNumero)]">
                                            <i :class="['fs-5 me-3', iconoRegla(tieneNumero)]"></i>
                                            <span class="small fw-medium">Al menos un número</span>
                                            </b-col>

                                            <b-col cols="12" :class="['d-flex align-items-center p-2 rounded-2 transition-all', bgRegla(tieneEspecial)]">
                                            <i :class="['fs-5 me-3', iconoRegla(tieneEspecial)]"></i>
                                            <span class="small fw-medium">Al menos un carácter especial <code class="badge bg-light text-dark border ms-1">.*-+!</code></span>
                                            </b-col>

                                            <b-col cols="12" :class="['d-flex align-items-center p-2 rounded-2 transition-all', bgRegla(longitudValida)]">
                                            <i :class="['fs-5 me-3', iconoRegla(longitudValida)]"></i>
                                            <span class="small fw-medium">Entre 8 y 15 dígitos de longitud</span>
                                            </b-col>

                                        </b-row>
                                        </b-container>
                                    </b-card>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
    </b-container>
</template>

<style scoped></style>