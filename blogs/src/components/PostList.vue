

<template>
  <div class="container mt-4" v-if="blogs">

    <div class="row">

      <div class="col-md-9">
        <single-post
        v-for="blog in blogs"
        :blog="blog"
        :key="blog.id"

       >

       </single-post>

      </div>
      <div class="col-md-3">
        <TagCloud></TagCloud>
      </div>


    </div>

  </div>
  <div v-else>
    Problem
  </div>
</template>



<script >

import SinglePost from "@/components/SinglePost.vue";
import TagCloud from "@/components/TagCloud.vue";

export default{
  components: {SinglePost,TagCloud},
  data(){
    return{
      blogs:[],
    }
  },
  methods:{
    async fetchBlogs() {
      try {
        const response = await fetch('http://localhost:3000/blogs/');
        if (!response.ok) {
          throw new Error('Failed to load blogs');
        }
        const data = await response.json();
        this.blogs = data;


        // Indiquer que les données ont été rechargées
        this.reload = true;
        setTimeout(() => {
          this.reload = false;
        }, 500);
        console.log(this.blogs)
      } catch (error) {
        console.error(error);
        alert('Error loading blogs');
      }
    }
  },
  mounted() {
    this.fetchBlogs()
  }

}

</script>

<style >

</style>