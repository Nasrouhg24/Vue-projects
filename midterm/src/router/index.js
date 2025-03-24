import { createRouter, createWebHistory } from 'vue-router';
import LibraryBooks from "@/components/LibraryBooks.vue";
import BookDetail from "@/components/BookDetail.vue";


const routes = [
    {path:"/",name:"Library",component:LibraryBooks},
    {path:"/book-detail/id:id",name:"book-detail",component: BookDetail,props:true}


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
