

<template>





    <div class="card text-bg-light mb-3" style="max-width: 1500px;"  v-if="book && book.disponible">
      <div class="row g-0" >
        <div class="col-md-4" style="max-width: 200px;">
          <img :src="book.image" class="img-fluid rounded-start" alt="can't load the image">
        </div>
        <div class="col-md-8" >
          <div class="card-body">
            <h5 class="card-title">{{ book.titre }}</h5>
            <p class="card-text"><strong >{{book.auteur}}</strong></p>
            <p class="description">{{ book.resume }}</p>
            <p class="text-body-secondary"><strong>Catégorie:</strong> {{ book.categorie }}</p>
            <p class="text-body-secondary"><strong>Année:</strong> {{ book.annee }}</p>


          </div>
        </div>
      </div>
    </div>


    <div>
    <router-link to="/"><button class="btn btn-light btn-outline-dark">Go to Bibliothèque</button></router-link>
    </div>






</template>




<script >




export default{

  props:['id'],
  data(){
    return{
      book : null,
      books:[]
    }
  },
  methods:{
    async fetch_book(){
      try {
        const response = await fetch('http://localhost:3000/livres/');
        if (!response.ok) {
          throw new Error('Failed to load livres');
        }
        const data = await response.json();
        this.books = data;
        this.book = this.books.find(book => book.id === this.id);




        this.reload = true;
        setTimeout(() => {
          this.reload = false;
        }, 500);
        console.log(this.books)
      } catch (error) {
        console.error(error);
        alert('Error loading livres');
      }
    }
  },
  mounted() {
    this.fetch_book()
  }
}
</script>

<style >

</style>