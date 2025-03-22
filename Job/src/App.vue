

<template>
  <Home :list-jobs="Jobs">

  </Home>

  <a>khkujhkujhkj</a>
</template>




<script>


import Home from './components/Home.vue'
export default{
  components:{
    Home,
  },
  data(){
    return{
      Jobs:[],
    }
  },
  mounted(){

      fetch('http://localhost:3000/jobs')
      .then(response => response.json()) // Convertir en JSON
      .then(data => {
        this.Jobs = data; // Assigner les données correctement
        console.log(this.Jobs); // Vérifier les données récupérées
      })
      .catch(err => console.error('Erreur lors du fetch:', err))



      console.log(this.Jobs)



  }
}





</script>

<style>

</style>
