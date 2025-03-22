<template>
  <div class="container mt-4">

    <h1 class="display-4 mb-4">{{ actualJob.titre }}</h1>


    <div class="mb-4">
      <p class="lead"><strong>Salaire :</strong> {{ actualJob.salaire }} EUR/mois</p>
      <p class="text-muted"><strong>Date de création :</strong> {{ actualJob.date_creation }}</p>
    </div>


    <div class="card mb-4">
      <div class="card-body">
        <p class="card-text" >{{ actualJob.detail }}</p>
      </div>
    </div>


    <button @click="exit" class="btn btn-danger">Exit</button>
  </div>
</template>

<script>
export default {
  props: ['actualJob', 'real'],
  methods: {
    exit() {

      this.$emit("update:real", !this.real);
    },
  },
};
</script>

<style scoped>

.container {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 1.5rem;
}

.btn {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
</style>