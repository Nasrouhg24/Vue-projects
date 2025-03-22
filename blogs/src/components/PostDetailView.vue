

<template>
    <div class="container mt-4" v-if ="blog">
      <div class="row">


        <div class = col-md-9>
          <h1 class="display-4 mb-4">{{ blog.title }}</h1>

          <div class="card mb-4">
            <div class="card-body">
              <p class="card-text" >{{ blog.text }}</p>
            </div>
          </div>

          <div class="tags-container" style="display: flex; flex-wrap: wrap;">
            <div v-for="(tag, index) in blog.tags" :key="index" class="tag" style="margin-right: 10px;">
              #{{ tag }}
            </div>
          </div>

          <router-link to="/"><button >Go To Home</button></router-link>
        </div>


        <div class="col-md-3">
            <TagCloud></TagCloud>
          </div>
      </div>








  </div>

</template>

<script >
import TagCloud from "@/components/TagCloud.vue";
export default {
  components:{TagCloud},
  props:['id'],
  data(){
    return{
      blog:null,
      blogs:[]
    }
  },
  methods:{
    async fetchBlog() {
      try {
        const response = await fetch('http://localhost:3000/blogs/');
        if (!response.ok) {
          throw new Error('Failed to load blogs');
        }
        const data = await response.json();
        this.blogs = data;

        // Make sure to parse the ID properly, if it's a string
        const blogId = parseInt(this.id);

        // Filter the blog based on the parsed ID
        this.blog = this.blogs.find(blog => blog.id === blogId);

        // Log for debugging
        console.log('Blog ID:', blogId);
        console.log('Selected Blog:', this.blog);

      } catch (error) {
        console.error(error);
        alert('Error loading blogs');
      }
    }
  },
  mounted() {
    this.fetchBlog()
  }
}

</script>

<style scoped>

</style>