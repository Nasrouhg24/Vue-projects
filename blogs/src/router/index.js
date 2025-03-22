import { createRouter, createWebHistory } from 'vue-router';
import PostList from "@/components/PostList.vue";
import PostDetailView from "@/components/PostDetailView.vue";
import CreatePostView from "@/components/CreatePostView.vue";
import TagShowOnly from "@/components/TagShowOnly.vue";


const routes = [
    {path:'/',component:PostList,name:"Home"},
    {path:"/post-detail-:id",component:PostDetailView,name:"details",props:true},
    {path:"/create-post",component: CreatePostView,name:"create-post"},
    {path:"/tag:tag",component: TagShowOnly,name: "tags",props: true}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
