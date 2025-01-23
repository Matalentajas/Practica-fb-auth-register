<template>
    <section >
      <h1 v-if="userName">Perfil</h1>
      <form @submit.prevent="saveProfile">
          <img :src="profile.image" alt="">
          <input type="text" v-model="profile.image" placeholder="Introduce la url de tu imagen">
          <input type="text" v-model="profile.fullName" placeholder="Introduce tu nombre completo" required>
          <input type="text" v-model="profile.profession" placeholder="¿En qué trabajas?" required>
          <input type="number" v-model="profile.age" placeholder="Dinos tu edad" required>
          <input type="text" v-model="profile.currentCity" placeholder="¿En qué ciudad vives?">
          <input type="text" v-model="profile.company" placeholder="¿Para quién trabajas?" required>
          <textarea v-model="profile.bio" placeholder="Cuentanos sobre ti"></textarea>
          
          <h3>Motivaciones</h3>
          <div v-for="(motivation,index) in profile.motivations" :key="index">
              <input type="text" v-model="profile.motivations[index]" placeholder="Nueva motivación">
          </div>
          <button @click.prevent="addMotivation">Añadir Motivación</button>
  
          <h3>Objetivos</h3>
          <div v-for="(goal,index) in profile.goals" :key="index">
              <input type="text" v-model="profile.goals[index]" placeholder="Nuevo objetivo">
          </div>
          <button @click.prevent="addGoal">Añadir Objetivo</button>
  
          <h3>Preocupaciones</h3>
          <div v-for="(concern,index) in profile.concerns" :key="index">
              <input type="text" v-model="profile.concerns[index]" placeholder="Nueva preocupación">
          </div>
          <button @click.prevent="addConcern">Añadir Preocupación</button>
  
          <button type="submit">Actualizar perfil</button>
      </form>
      <button @click="logout">Cerrar sesión</button>
    </section>
  </template>
  
  <script>
  import { auth, db } from "../db/firebase.js"
  import { signOut } from 'firebase/auth'
  import { doc, getDoc, setDoc } from 'firebase/firestore'
  
  export default {
      name:'PerfilView',
      data(){
          return{
              userName:'',
              profile:{
                  image:'',
                  fullName:'',
                  profession:'',
                  age:0,
                  currentCity:'',
                  company:'',
                  bio:'',
                  motivations:[],
                  goals:[],
                  concerns:[]
              }
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
          },
          async fetchProfile(){
              if (!this.userName) {
                  return 
              }
              try {
                  const docRef=doc(db, "users", this.userName.uid)
                  const docSnap=await getDoc(docRef)
                  if (docSnap.exists()) {
                      this.profile={...docSnap.data()} //hace una copia de los datos
                  }else{
                      console.warn('No se encontró el perfil')
                  }
              } catch (error) {
                  alert('Error al obtener el perfil 💀')
              }
          },
          async saveProfile(){
              if (!this.userName) {
                  return 
              }
              try {
                  const docRef=doc(db, "users", this.userName.uid)
                  await setDoc(docRef, this.profile)
                  alert('Perfil guardado correctamente! 😍')
              } catch (error) {
                  alert('Error al actualizar el perfil 💀')
              }
          },
          addMotivation(){
              this.profile.motivations.push("")
          },
          addGoal(){
              this.profile.goals.push("")
          },
          addConcern(){
              this.profile.concerns.push("")
          },
          handleAuthStateChange(){
              auth.onAuthStateChanged( (user) =>{
                  this.userName=user
                  if (user) {
                      this.fetchProfile() //
                  }
              } )
          }
  
  
  
  
  
      },
      mounted(){
          this.userName=auth.currentUser
          
          this.handleAuthStateChange()
         
      }
  }
  </script>
  
  <style>
  
  </style>