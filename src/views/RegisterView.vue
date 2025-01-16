<template>
    <section>
        <h2>Registro de usuarios</h2>
        <form @submit.prevent="registerUser">
            <div>
                <label>Correo Electronico</label>
                <input type="email" v-model="email" id="email" required placeholder="Correo Electronico">
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" v-model="password" id="password" required placeholder="Contraseña">
            </div>
            <button type="submit">Registrarse</button>
        </form>
    </section>
</template>

<script>
import { auth } from '@/db/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
export default {
    name: 'RegisterView',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async registerUser(){
            try {
                //Crear el usuario en firebase Auth
                const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
                const user = userCredential.user;
                console.log("Usuario creado", user);

                this.$router.push({ name: 'register' });

                //Redirigir al perfil de usuario
                
            } catch (error) {
                console.error("Error al registrar el usuario", error.message);
                alert(error.message);
            }

        }
    }
}
</script>