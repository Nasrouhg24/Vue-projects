<template>
  <div class="container mt-5">
    <form action="" method="POST" class="card p-5 shadow-lg animate__animated animate__fadeIn">
      <div class="row">
        <!-- Colonne pour le Titre et les Détails -->
        <div class="col-md-6">
          <div class="mb-4">
            <label for="titre" class="form-label fw-bold text-primary">Page Title</label>
            <input
              type="text"
              id="titre"
              name="titre"
              class="form-control form-control-lg input-custom"
              v-model="titre"
              placeholder="Enter page title"
            >
          </div>
          <div class="mb-4">
            <label for="detail" class="form-label fw-bold text-primary">Job Detail</label>
            <textarea
              id="detail"
              name="detail"
              class="form-control form-control-lg input-custom"
              rows="10"
              v-model="detail"
              placeholder="Enter job details"
            ></textarea>
          </div>
        </div>

        <!-- Colonne pour Description, Salaire, Date et Bouton -->
        <div class="col-md-6">
          <div class="mb-4">
            <label for="description" class="form-label fw-bold text-primary">Job Description</label>
            <input
              type="text"
              id="description"
              name="description"
              class="form-control form-control-lg input-custom"
              v-model="description"
              placeholder="Enter job description"
            >
          </div>
          <div class="mb-4">
            <label for="salaire" class="form-label fw-bold text-primary">Job Salary</label>
            <input
              type="number"
              id="salaire"
              name="salaire"
              class="form-control form-control-lg input-custom"
              v-model="salaire"
              placeholder="Enter salary"
            >
          </div>
          <div class="mb-4">
            <label for="date" class="form-label fw-bold text-primary">Job Creation Date</label>
            <input
              type="date"
              id="date"
              name="date"
              class="form-control form-control-lg input-custom"
              v-model="date"
            >
          </div>
          <div class="d-grid">
            <button
              type="submit"
              class="btn btn-primary btn-lg fw-bold rounded-pill shadow-sm"
              @click.prevent="submitForm"
              :disabled="isFormInvalid"
            >
              Update Job
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: ['actualJob', 'edit'],
  data() {
    return {
      titre: this.actualJob.titre,
      description: this.actualJob.description,
      salaire: this.actualJob.salaire,
      date: this.actualJob.date_creation,
      detail: this.actualJob.detail,
    };
  },
  computed: {
    isFormInvalid() {
      return !this.titre || !this.description || !this.salaire || !this.date || !this.detail;
    },
  },
  methods: {
    async submitForm() {
      const newjob = {
        titre: this.titre,
        description: this.description,
        salaire: this.salaire,
        date_creation: this.date,
        detail: this.detail,
      };
      try {
        const response = await fetch(`http://localhost:3000/jobs/${this.actualJob.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newjob),
        });
        if (!response.ok) {
          throw new Error('Failed to update the job');
        }
        const updatedJob = await response.json();
        this.$emit('update-job', updatedJob);
        this.$emit('update:edit', !this.edit);
        this.$emit('reload-filterJobs');
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert('Problem updating the job');
      }
    },
  },
  watch: {
    actualJob: {
      handler(newValue) {
        this.titre = newValue.titre;
        this.description = newValue.description;
        this.salaire = newValue.salaire;
        this.date = newValue.date_creation;
        this.detail = newValue.detail;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
/* Styles améliorés */
.form-control {
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
  padding: 12px;
  border: 2px solid #ced4da;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 10px rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background: linear-gradient(45deg, #007bff, #0056b3);
  border: none;
  transition: all 0.3s ease-in-out;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #0056b3, #007bff);
  transform: scale(1.05);
}

.btn-primary:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.card {
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Increased shadow */
  width: 100%; /* Full width */
  max-width: 1400px; /* Increased max width */
  margin: 0 auto; /* Center the card */
  padding: 2rem; /* Increased padding */
}

.card:hover {
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2); /* Increased shadow effect */
}

.input-custom {
  background: #f8f9fa;
  border: 1px solid #ced4da;
}

.input-custom:focus {
  background: #ffffff;
}

.label-custom {
  font-weight: bold;
  color: #495057;
}

/* Ensure textarea is larger */
textarea.form-control {
  min-height: 200px; /* Adjust height as needed */
}
</style>