/* eslint-disable */

<template>
  <div class="panier">
    <div>
      <label>Total: {{total}}</label>

    </div>
    <div
      v-for="(book,index) in panier"
      :key="index"
      class="book card mt-2 p-3"
    >
    <h3 class="card-title">{{ book.title }}</h3>

    <button @click.stop="deleteJob(book)" class="btn btn-delete">
          <i class="fas fa-trash-alt"></i>
    </button>

    </div>
  </div>
</template>

<script>
export default{
  props:['panier'],
  data(){
    return{

    }

  },
  computed:{
    total(){
      let sum =0
      for(let book in this.panier){
        sum+= book.price
      }
      return sum
    }
  }
}


</script>

<style>

.panier {
  float: left;
  width: 50%;
}

</style>