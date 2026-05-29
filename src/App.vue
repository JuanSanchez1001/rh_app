<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';

let temporizador = null;
const router = useRoute();
const _time_limit = (60 * 15) * 1000; //lo dejamos dificil se ve mas elegante

function closeSession(){
    localStorage.clear();
}
function resetTimer(){
    if (temporizador){
        clearTimeout(temporizador);
    }
    temporizador = setTimeout(closeSession, _time_limit);
}
onMounted(() => {
    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
});
onUnmounted(() => {
    if(temporizador){
        clearTimeout(temporizador);
    }
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
});

</script>

<template>
    
    <RouterView></RouterView>
    <!-- <RouterLink to="/rh/login"></RouterLink> -->
</template>

<style scoped></style>
