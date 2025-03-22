<template>
  <div>
    <filter-nav
      v-if="jobs.length > 0"
      :list-job="jobs"
      @filter="updateFilteredJobs"
      :reload="reload"
      @update:reload="reload=$event"
    ></filter-nav>

    <div class="container mt-4" v-if="!viewingDetails && !editing">
      <div v-for="(job, index) in filteredJobs" :key="job.id || index" class="card mt-2 p-3" @click="viewDetails(job)">
        <h5 class="card-title">{{ job.titre }}</h5>
        <p class="card-text">{{ job.description }}</p>
        <p><strong>Salaire :</strong> {{ job.salaire }} EUR/mois</p>
        <p><small><strong>Date :</strong> {{ job.date_creation }}</small></p>

        <div class="d-flex justify-content-end gap-2">
          <button @click.stop="editJob(job)" class="btn btn-edit">
            <i class="fas fa-pencil-alt"></i> Edit
          </button>
          <button @click.stop="deleteJob(job)" class="btn btn-delete">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      </div>
    </div>

    <JobDetails
      v-if="viewingDetails"
      :actualJob="selectedJob"
      :real="viewingDetails"
      @update:real="viewingDetails = $event"
    ></JobDetails>

    <EditJob
      v-if="editing"
      :actualJob="selectedJob"
      :edit="editing"
      @update:edit="editing = $event"
    ></EditJob>
  </div>

  <router-view></router-view>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import FilterNav from "@/components/FilterNav.vue";
import JobDetails from "@/components/JobDetails.vue";
import EditJob from "@/components/EditJob.vue";
import emitter from "@/eventBus.js";

export default {
  components: { FilterNav, JobDetails, EditJob },
  data() {
    return {
      jobs: [],
      filteredJobs: [],
      viewingDetails: false,
      editing: false,
      selectedJob: null,
      reload: false
    };
  },
  methods: {
    updateFilteredJobs(filteredJobs) {
      this.filteredJobs = filteredJobs;
    },
    viewDetails(job) {
      this.viewingDetails = true;
      this.editing = false;
      this.selectedJob = job;
    },
    editJob(job) {
      this.editing = true;
      this.viewingDetails = false;
      this.selectedJob = job;
    },
    async deleteJob(job) {
      try {
        const response = await fetch(`http://localhost:3000/jobs/${job.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete the job');
        }

        // Mettre à jour la liste des jobs
        this.jobs = this.jobs.filter(j => j.id !== job.id);
        this.filteredJobs = this.filteredJobs.filter(j => j.id !== job.id);

        alert(`${job.titre} deleted`);
      } catch (error) {
        console.error(error);
        alert('Problem deleting the job');
      }
    },
    async fetchJobs() {
      try {
        const response = await fetch('http://localhost:3000/jobs/');
        if (!response.ok) {
          throw new Error('Failed to load jobs');
        }
        const data = await response.json();
        this.jobs = data;
        this.filteredJobs = data;

        // Indiquer que les données ont été rechargées
        this.reload = true;
        setTimeout(() => {
          this.reload = false;
        }, 500);
      } catch (error) {
        console.error(error);
        alert('Error loading jobs');
      }
    }
  },
  mounted() {
    this.fetchJobs();

    // Écouter l'événement pour recharger les jobs
    emitter.on('reload-jobs', this.fetchJobs);
  },
  beforeUnmount() {
    // Nettoyer l'écouteur d'événement
    emitter.off('reload-jobs', this.fetchJobs);
  }
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 20px;
  position: relative;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.card strong {
  color: #34495e;
}

.card p {
  margin: 5px 0;
}

.card small {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.btn-edit {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-edit:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-edit:active {
  background-color: #004080;
  transform: translateY(0);
}

.btn-delete {
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 5px;
}

.btn-delete:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.btn-delete:active {
  background-color: #a71d2a;
  transform: translateY(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeIn 0.5s ease-out;
}
</style>
