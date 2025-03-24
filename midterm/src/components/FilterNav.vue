<template>
  <nav :class="[`navbar-light`, `bg-light`, 'navbar', 'navbar-expand-lg']">
    <div class="container-fluid">
      <div class="filter-container">
        <div class="filter-item">
          <label for="name" class="form-label">titre du livre</label>
          <input
            type="text"
            class="form-control"
            v-model="titre"
            @input="ApplyFilter"
          />
        </div>

        <div class="filter-item">
          <label for="salary" class="form-label">auteur</label>
          <input
            type="text"
            class="form-control"
            v-model="author"
            @input="ApplyFilter"
          />
        </div>


      </div>
    </div>
  </nav>








</template>

<script>
export default {
  props: ['books'],
  data() {
    return {
      titre: "",
      author: "",
    };
  },
  methods: {
    ApplyFilter() {
      if (!this.books || !Array.isArray(this.books)) {
        this.$emit('filter', []);
        return;
      }

      let filteredBooks = [...this.books];

      if (this.author) {
        filteredBooks = filteredBooks.filter(
          (book) =>
            book && book.auteur && book.auteur.toLowerCase().includes(this.author.toLowerCase())
        );
      }
      if (this.titre) {
        filteredBooks = filteredBooks.filter(
            (book)=>
            book && book.titre && book.titre.toLowerCase().includes(this.titre.toLowerCase())
        );
      }

      this.$emit('filter', filteredBooks);
    },
  },
  watch: {
    author: 'ApplyFilter',
    titre: 'ApplyFilter',
  },
};
</script>
<style>
.filter-container{
  display: inline-flex;
}
</style>