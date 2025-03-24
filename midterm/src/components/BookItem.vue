<template>




  <div class="card mb-3" style="max-width: 540px;"  v-if="book.disponible">
    <div class="row g-0" @click.prevent="goToDetail(book.id)">
      <div class="col-md-4">
        <img :src="book.image" class="img-fluid rounded-start" alt="can't load the image">
      </div>
      <div class="col-md-8" >
        <div class="card-body">
          <h5 class="card-title">{{ book.titre }}</h5>
          <p class="card-text">{{book.resume}}</p>
          <p class="card-text"><small class="text-body-secondary">{{book.auteur}}</small></p>
        </div>
      </div>
    </div>
  </div>






</template>

<script>
export default {
  props: ["book"],
  methods: {
    goToDetail(id) {
      this.$router.push({name: 'book-detail', params: {id: id}});
    }
  }
};
</script>

<style scoped>


</style>
