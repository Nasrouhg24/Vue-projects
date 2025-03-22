/* eslint-disable */
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold">Job Portal</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Job List</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/addjob" class="nav-link">Add Job</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-4">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Jobs: [],
    };
  },
  mounted() {
    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((data) => {
        this.Jobs = data;
        console.log(this.Jobs);
      })
      .catch((err) => console.error("Erreur lors du fetch:", err));

    console.log(this.Jobs);
  },
};
</script>

<style scoped>
.nav-link {
  font-size: 1.1rem;
  font-weight: 500;
}

.nav-link:hover {
  color: #007bff !important;
}
</style>
