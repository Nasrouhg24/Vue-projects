import { createRouter, createWebHistory } from 'vue-router';
import JobList from '@/components/JobList.vue';
import AddJob from '@/components/AddJob.vue';
import EditJob from '@/components/EditJob.vue';
import JobDetails from '@/components/JobDetails.vue';

const routes = [
  { path: '/', name: 'JobList', component: JobList },
  { path: '/addjob', name: 'AddJob', component: AddJob },
  { path: '/edit-job', name: 'EditJob', component: EditJob },
  { path: '/job-details', name: 'JobDetails', component: JobDetails }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
