<template>
    <section>
        <h2>Inicia Sesión</h2>
        <form @submit.prevent="loginUser">
            <div>
                <label>Correo Electronico</label>
                <input type="email" v-model="email" id="email" required placeholder="Correo Electronico">
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" v-model="password" id="password" required placeholder="Contraseña">
            </div>
            <button type="submit">Iniciar Sesión</button>
            <p>¿No tienes cuenta? <router-link to="/">Registrate</router-link></p>
        </form>
    </section>
</template>

<script>
import { auth } from '@/db/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
export default {
    name: 'LoginView',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async loginUser(){
            try{
                await signInWithEmailAndPassword(auth, this.email, this.password)
                this.$router.push('/perfil');
            } catch (error) {
                console.error("Error al iniciar sesion", error.message);
                alert(error.message);
            }
        }
    }
}
</script>