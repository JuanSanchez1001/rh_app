<script setup>
    import { BNavbar, BNavItem, BNavItemDropdown, BDropdownItem,BNavbarNav, BNavbarBrand,BButton } from 'bootstrap-vue-next';
    import Sidebar from './Sidebar.vue';
    import { ref } from 'vue';
    const isSidebarOpen = ref(false);

    let nombre = localStorage.getItem('nombre');
    let departamento = localStorage.getItem('departamento')

</script>
<template>
    <b-navbar fluid class="nav-menu p-0 mb-3 w-100">
        <b-navbar-brand>
            <b-button @click="isSidebarOpen = !isSidebarOpen">
                  <span><i class="bi bi-list"></i></span>
              </b-button>
              <img src="../../assets/img/ftech.png" alt="" style="height: 20px;">
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Usuario" right>
                <b-dropdown-item> <span><i class="bi bi-person-badge-fill"></i></span> {{ nombre }}</b-dropdown-item>
                <!-- <b-dropdown-item><span><i class="bi bi-person-vcard-fill"></i></span> Username</b-dropdown-item> -->
                <b-dropdown-item><span><i class="bi bi-buildings-fill"></i></span> {{ departamento }}</b-dropdown-item>
                <!-- <b-dropdown-item><span><i class="bi bi-envelope"></i></span> Correo</b-dropdown-item> -->
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
    <!--La mera exportacion del sidebar-->
  <Sidebar v-model="isSidebarOpen"/>
  
</template>
<style scoped>
.nav-menu{
    background-color: #87FA91;
    border-radius: 15px;
    font-size: large;
    font-weight: bold;
    width: 100% !important;
    left: 0;
    right: 0;
    margin-left: 0;
    margin-right: 0;
    }
</style>