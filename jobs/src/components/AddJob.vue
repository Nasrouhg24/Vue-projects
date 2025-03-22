<template>
  <div class="container mt-5">
    <form action="" method="POST" class="card p-5 shadow-lg animate__animated animate__fadeIn">
      <div class="row">
        <div class="col-md-6">
          <div class="mb-4">
            <label for="titre" class="form-label fw-bold text-primary">Job Title</label>
            <input
              type="text"
              id="titre"
              name="titre"
              class="form-control form-control-lg input-custom"
              v-model="titre"
              placeholder="Enter job title"
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
              v-model="date_creation"
            >
          </div>
          <div class="d-grid">
            <button
              type="submit"
              class="btn btn-primary btn-lg fw-bold rounded-pill shadow-sm"
              @click.prevent="submitForm"
              :disabled="isFormInvalid"
            >
              Add Job
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import emitter from "@/eventBus.js";

export default {
  data() {
    return {
      titre: "",
      description: "",
      salaire: "",
      date_creation: "",
      detail: "",
    };
  },
  computed: {
    isFormInvalid() {
      return (
        !this.titre ||
        !this.description ||
        !this.salaire ||
        !this.date_creation ||
        !this.detail
      );
    },
  },
  methods: {
    async submitForm() {
      const newJob = {
        titre: this.titre,
        description: this.description,
        salaire: this.salaire,
        date_creation: this.date_creation,
        detail: this.detail,
      };

      try {
        const response = await fetch(`http://localhost:3000/jobs/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newJob),
        });

        if (!response.ok) {
          throw new Error('Failed to create the job');
        }

        // Émettre un événement pour notifier les autres composants
        emitter.emit('reload-jobs');

        // Réinitialiser le formulaire
        this.resetForm();

        // Rediriger vers la page d'accueil
        this.$router.push('/');

      } catch (error) {
        console.error(error);
        alert('Problème lors de la création du job');
      }
    },

    resetForm() {
      this.titre = "";
      this.description = "";
      this.salaire = "";
      this.date_creation = "";
      this.detail = "";
    }
  }
};
</script>

<style scoped>
/* Styles inchangés */
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.card:hover {
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
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

textarea.form-control {
  min-height: 200px;
}
</style>