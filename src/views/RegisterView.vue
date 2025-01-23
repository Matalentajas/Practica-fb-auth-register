<template>
  <section class="bg-blue-900 bg-cover h-screen flex items-center justify-center">
    <div class="bg-white p-8 w-[320px] h-[400px] flex items-center flex-col">
        <h2 class="text-blue-900 font-mono font-bold text-3xl" >Regístrate</h2>
        <form @submit.prevent="registerUser">
            <div class="ml-2 mt-12 flex items-center">
                 <font-awesome-icon icon="envelope" class="text-white h-[20px] p-2 bg-blue-900" />
                <input class="bg-slate-200 text-blue-900 placeholder:text-blue-500 pl-2 w-[200px] h-[35px]" 
                type="email" 
                id="email" 
                v-model="email" 
                placeholder="Correo electronico" 
                required>
            </div>
            <div class="ml-2 mt-8 flex items-center">
                <font-awesome-icon icon="lock" class="text-white h-[22px] p-2 bg-blue-900" />
                <input class="bg-slate-200 text-blue-900 placeholder:text-blue-500 pl-2 w-[200px] h-[35px]" type="password" id="password" v-model="password" placeholder="Contraseña" required>
            </div>
            <div class="flex flex-col items-center">
                <button class="bg-blue-900 text-white h-[35px] w-[208px]  mt-8 mb-4" type="submit">Registrarse</button>
            </div>
            <p class="ml-3 text-xs">¿Ya tienes cuenta? <router-link to="/login" class="text-blue-500 underline">Iniciar sesión</router-link></p>
        </form>
    </div>
  </section>
</template>

<script>
import { auth } from "@/db/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
library.add(faEnvelope, faLock);

export default {
    name:'RegisterView',
    components: {
    FontAwesomeIcon,
  },
    data(){
        return{
            email: "",
            password: ""
        }
    },
    methods:{
        async registerUser(){
            try {
                await createUserWithEmailAndPassword(auth, this.email, this.password)
                this.$router.push('/perfil')
            } catch (error) {
                console.error("Error al registrar usuario: ", error.message)
                alert(error.message)
            }
        }
    }
}
</script>