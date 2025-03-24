<template>


  <div class="layout">
    <FilterNav
      v-if="books.length > 0"
      :books="books"
      @filter="updateFilteredBooks"

    ></FilterNav>

    <div class="container mt-4" v-if="FilteredBooks.length">
      <BookItem
        v-for="book in FilteredBooks"
        :book="book"
        :key="book.id"

      />
    </div>


  </div>
</template>

<script>

import BookItem from "@/components/BookItem.vue";
import FilterNav from "@/components/FilterNav.vue";

export default {
  components: { BookItem,FilterNav },
  data() {
    return {
      books: [],
      FilteredBooks:[]
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch("http://localhost:3000/livres/");
        if (!response.ok) {
          throw new Error("Failed to load books");
        }
        this.books = await response.json();
        this.FilteredBooks = this.books
      } catch (error) {
        console.error(error);
        alert("Error loading books");
      }
    },
    updateFilteredBooks(filteredBooks){
      this.FilteredBooks =filteredBooks
    }
  },
  mounted() {
    this.fetchBooks();
    console.log(this.books)
  }
};
</script>

<style>


.container {
  flex: 1;
}
.layout{
  margin: auto;

}


</style>