<template>
  <section>
    <h1>Perfil</h1>
    <form @submit.prevent="saveProfile">
    <input type="text" v-model="profile.image" placeholder="¿Cuál es la URL de tu foto de perfil?">
    <input type="text" v-model="profile.fullname" placeholder="¿Cómo te llamas?" required>
    <input type="text" v-model="profile.profession" placeholder="¿A qué te dedicas?" required>
    <input type="number" v-model="profile.age" placeholder="¿Cuántos años tienes?" required>
    <input type="text" v-model="profile.currentCity" placeholder="¿En qué ciudad vives?">
    <input type="text" v-model="profile.company" placeholder="¿Cuál es el nombre de tu empresa?" required>
    <textarea v-model="profile.bio" placeholder="¿Qué te gusta hacer?"></textarea>

    <h3>Motivaciones</h3>
    <div v-for="(motivation, index) in profile.motivations" :key="index">
        <input type="text" v-model="profile.motivacions[index]" placeholder="¿Qué te motiva?">
    </div>
    <button @click.prevent="addMotivation">Añadir motivación</button>

    <h3>Objetivos</h3>
    <div v-for="(goal, index) in profile.goals" :key="index">
        <input type="text" v-model="profile.goals[index]" placeholder="¿Qué objetivos tienes?">
    </div>
    <button @click.prevent="addGoal">Añadir objetivo </button>

    <h3>Preocupaciones</h3>
    <div v-for="(concern, index) in profile.concerns" :key="index">
        <input type="text" v-model="profile.concerns[index]" placeholder="¿Qué te preocupas tienes?">
    </div>
    <button @click.prevent="addConcern">Añadir Preocupacion </button>

    <button type="submit">Actualizar Perfil</button>

</form>

    <button @click="logout">Cerrar sesion</button>
  </section>
</template>

<script>
import { auth, db } from "@/db/firebase"
import { signOut } from 'firebase/auth'
import { doc, getDoc, setDoc} from 'firebase/firestore'

export default {
    name:'PerfilView',
    data(){
        return{
            user: {
                user: null
            },
            profile: {
                image: '',
                fullname: '',
                profession: '',
                age: 0,
                currentCity: '',
                company: '',
                bio: '',
                motivations: [],
                goals: [],
                concerns: []
            }
        }
    },
    methods:{
        async logout(){
            await signOut(auth)
            this.$router.push('/')
        },
        async fetchProfile(){
            if(!this.user) return
            try {
                const docRef = doc(db, "users", this.user.uid)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    this.profile = {...docSnap.data()}
                }else{
                    console.warm("No encontro el perfil")
                }
            } catch (error) {
                console.error("Error al obtener el perfil: ", error)
            }
        },
        async saveProfile(){
            if(!this.user) return
            try {
                const docRef = doc(db, "users", this.user.uid)
                await setDoc(docRef, this.profile)
                alert ("Perfil guardado correctamente! 😍")
            } catch(error){
                console.error("Error al guardar el perfil😒: ", error)
            }
        },
        addMotivation(){
            this.profile.motivations.push('')   
        },
        addGoal(){
            this.profile.goals.push('')   
        },
        addConcern(){
            this.profile.concerns.push('')   
        },

    mounted(){
        this.user = auth.currentUser
    }
    }
}
</script>

<style>

</style>