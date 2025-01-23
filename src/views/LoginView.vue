<template>
    <section class="bg-teal-800 bg-cover h-screen flex items-center justify-center">
        <div class="bg-white p-8 w-[320px] h-[400px] flex items-center flex-col">
            <h2 class="text-blue-900 font-mono font-bold text-3xl">Inicia Sesión</h2>
            <form @submit.prevent="login">
                <div class="ml-2 mt-12 flex items-center">
                    <font-awesome-icon icon="envelope" class="text-white h-[20px] p-2 bg-blue-900" />
                    <input class="bg-slate-200 text-blue-900 placeholder:text-blue-500 pl-2 w-[200px] h-[35px]" type="email" v-model="email" id="email" required placeholder="Correo electronico">
                </div>
                <div class="ml-2 mt-8 flex items-center">
                    <font-awesome-icon icon="lock" class="text-white h-[22px] p-2 bg-blue-900" />
                    <input class="bg-slate-200 text-blue-900 placeholder:text-blue-500 pl-2 w-[200px] h-[35px]" type="password" v-model="password" id="password" required placeholder="Contraseña">
                </div>
                <div class="flex flex-col items-center">
                    <button class="bg-blue-900 text-white h-[35px] w-[208px]  mt-8 mb-4" type="submit">Iniciar Sesión</button>
                </div>
                <p class="ml-3 text-xs">¿No tienes cuenta? <router-link to="/" class="text-blue-500 underline">Registrate</router-link></p>
            </form>
        </div>
    </section>
</template>

<script>
import { auth } from '@/db/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
library.add(faEnvelope, faLock);
export default {
    name: 'LoginView',
    components: {
    FontAwesomeIcon,
  },
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        async login(){
            try {
                await signInWithEmailAndPassword(auth, this.email, this.password)
                console.log("Usuario logueado");
                
                this.$router.push('/perfil')
            } catch (error) {
                alert('Error al iniciar sesión')
            }
        }
    }
}
</script>

<style>

</style>