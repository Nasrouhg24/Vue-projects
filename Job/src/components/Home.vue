<template>
  <div class="container mt-4">
    <div v-for="(job, index) in listJobs" :key="index" class="card mt-2 p-3">
      <h5 class="card-title">{{ job.titre }}</h5>
      <p class="card-text">{{ job.description }}</p>
      <p><strong>Salaire :</strong> {{ job.salaire }}</p>
      <p><small><strong>Date :</strong> {{ job.date_creation }}</small></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listJobs: Array // Définir le type de prop pour éviter les erreurs
  }
}
</script>

<style>
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f8f9fa;
}
</style>
