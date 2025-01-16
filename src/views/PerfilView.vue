<template>
  <section>
    <h1 v-if="userName">Bienvenido {{ userName.email }}</h1>
    <h1 v-else>cargando...</h1>
    <button @click="logout">Cerrar sesión</button>
  </section>
</template>

<script>
import { auth } from '@/db/firebase';
import { signOut } from 'firebase/auth';
export default {
    name: 'PerfilView',
    data(){
        return {
            userName: null,
            fetch: null
        }
    },
    methods:{
        async logout(){
            try {
                await signOut(auth)//Cierra la sesion del usuario
                this.$router.push({name:'register'})//Redirige al registro
            } catch (error) {
                console.log('Error al cerras sesion',error.message);
                
            }
        }
    },
    mounted(){
        const currentUser = auth.currentUser;
        if(currentUser){
            this.userName = currentUser.email;
        }else{
            this.$router.push({ name: 'register' });
        }
    }    
}
</script>

<style>

</style>