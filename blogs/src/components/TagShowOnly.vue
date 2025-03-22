<template>
  <div class="container mt-4" v-if="blogs">
    <div class="row">
      <div class="col-md-9">
        <h1 class="title">The tag {{ tag }}</h1>
        <single-post
          v-for="blog in blogs"
          :blog="blog"
          :key="blog.id"
        ></single-post>
      </div>
      <div class="col-md-3">
        <TagCloud></TagCloud>
      </div>
    </div>
  </div>
</template>

<script>
import SinglePost from "@/components/SinglePost.vue";
import TagCloud from "@/components/TagCloud.vue";

export default {
  components: { TagCloud, SinglePost },
  data() {
    return {
      blogs: [],
      tag: ''
    };
  },
  methods: {
    async getBlogsTags(tag) {
      try {
        const response = await fetch('http://localhost:3000/blogs/');
        if (!response.ok) {
          throw new Error('Failed to load blogs');
        }
        const data = await response.json();
        this.blogs = data.filter(blog => blog.tags.includes(tag));
      } catch (error) {
        console.error(error);
        alert('Error loading blogs');
      }
    }
  },
  watch: {
    '$route.params.tag': {
      immediate: true,
      handler(newTag) {
        this.tag = newTag;
        this.getBlogsTags(newTag);
      }
    }
  },
  mounted() {
    this.tag = this.$route.params.tag;
    this.getBlogsTags(this.tag);
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
