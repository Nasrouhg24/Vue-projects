<template>
  <div :key="blog.id" class="card mt-2 p-2" @click="viewDetails(blog.id)">
    <h5 class="card-title" style="font-size: 1.2rem; font-weight: bold;">{{ blog.title }}</h5>
    <p class="card-text" style="font-size: 0.9rem; color: #6c757d;">{{ blog.text.substring(0, 50) }}...</p>

    <div class="tags-container" style="display: flex; flex-wrap: wrap; margin-top: 10px;">
      <div v-for="(tag, index) in blog.tags" :key="index" class="tag" style="margin-right: 10px; font-size: 0.8rem; color: #007bff;">
        #{{ tag }}
      </div>
    </div>
  </div>
</template>

<script>


export default {

  props: ["blog"],
  methods: {
    viewDetails(Id) {
      this.$router.push({name: 'details', params: {id: Id}});
    }
  },
}
</script>

<style scoped>
.card {
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 80%;


}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 10px;
}

.tag {
  background-color: #e9ecef;
  padding: 4px 8px;
  border-radius: 20px;
  margin-bottom: 5px;
  font-size: 0.8rem;
  color: #007bff;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}
</style>
