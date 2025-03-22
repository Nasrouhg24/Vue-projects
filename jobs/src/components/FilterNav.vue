<template>
  <nav :class="[`navbar-light`, `bg-light`, 'navbar', 'navbar-expand-lg']">
    <div class="container-fluid">
      <div class="filter-container">
        <div class="filter-item">
          <label for="name" class="form-label">The name of the Job</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            @input="ApplyFilter"
          />
        </div>

        <div class="filter-item">
          <label for="salary" class="form-label">The salary</label>
          <input
            type="number"
            class="form-control"
            v-model="salary"
            @input="ApplyFilter"
          />
        </div>


      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['listJob'],
  data() {
    return {
      name: "",
      salary: "",
    };
  },
  methods: {
    ApplyFilter() {
      if (!this.listJob || !Array.isArray(this.listJob)) {
        this.$emit('filter', []);
        return;
      }

      let filteredJobs = [...this.listJob];

      if (this.name) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job && job.titre && job.titre.toLowerCase().includes(this.name.toLowerCase())
        );
      }

      if (this.salary) {
        filteredJobs = filteredJobs.filter(
          (job) => job && job.salaire && parseInt(job.salaire) >= parseInt(this.salary)
        );
      }

      this.$emit('filter', filteredJobs);
    },
  },
  watch: {
    name: 'ApplyFilter',
    salary: 'ApplyFilter',
  },
};
</script>
