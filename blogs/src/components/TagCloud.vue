<template>
  <div class="tags-container">
    <div
      v-for="(tag, index) in Tags"
      :key="index"
      class="tag"
      @click="tagClicked(tag)"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Tags: [],
    };
  },
  methods: {
    async allTags() {
      try {
        const response = await fetch('http://localhost:3000/blogs/');
        if (!response.ok) {
          throw new Error('Failed to load blogs');
        }
        const data = await response.json();
        const allTags = data.flatMap(blog => blog.tags);
        this.Tags = [...new Set(allTags)];

      } catch (error) {
        console.error(error);
        alert('Error loading blogs');
      }
    },
    tagClicked(tag) {
    this.$router.push({ name: 'tags', params: { tag: tag } });
    }

  },
  mounted() {
    this.allTags();
  },
  watch: {
    tag(newTag) {
      this.getBlogsTags(newTag);
    }
  }
};
</script>

<style scoped>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between tags */
  margin-top: 20px;
}

.tag {
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  padding: 8px 15px; /* Some padding */
  border-radius: 20px; /* Rounded corners */
  cursor: pointer; /* Makes it clear it's clickable */
  transition: background-color 0.3s ease;
}

.tag:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>
