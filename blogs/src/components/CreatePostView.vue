<template>
  <div class="container mt-5">
    <form action="" method="POST" class="card p-5 shadow-lg animate__animated animate__fadeIn">
      <div class="row">
        <!-- Title Input -->
        <div class="col-md-6">
          <div class="mb-4">
            <label for="titre" class="form-label fw-bold text-primary">Blog Title</label>
            <input
              type="text"
              id="titre"
              name="titre"
              class="form-control form-control-lg input-custom"
              v-model="title"
              placeholder="Enter blog title"
            />
          </div>
        </div>

        <!-- Description Input (wider input field) -->
        <div class="col-md-12">
          <div class="mb-4">
            <label for="description" class="form-label fw-bold text-primary">Blog Description</label>
            <textarea
              id="description"
              name="description"
              class="form-control form-control-lg input-custom"
              v-model="text"
              placeholder="Enter blog description"
              rows="6"
            ></textarea>
          </div>
        </div>

        <!-- Tags Input (displayed as a list) -->
        <div class="col-md-12">
          <div class="mb-4">
            <label for="tags" class="form-label fw-bold text-primary">Tags (e.g. #IA #Cyber)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              class="form-control form-control-lg input-custom"
              v-model="tagsInput"
              placeholder="Enter tags with # separated by spaces"
            />
            <div class="tags-list mt-2">
              <!-- Display tags in list format -->
              <ul>
                <li v-for="(tag, index) in tagsList" :key="index" class="tag-item">
                  {{ tag }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="d-grid mt-4">
          <button
            type="submit"
            class="btn btn-primary btn-lg fw-bold rounded-pill shadow-sm"
            @click.prevent="submitForm"
            :disabled="isFormInvalid"
          >
            Add Blog
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      text: "",
      tagsInput: "", // Input value for tags
      tagsList: [],  // The array to store the tags
    };
  },
  computed: {
    // Check if the form is valid
    isFormInvalid() {
      return !this.title || !this.text || this.tagsList.length === 0;
    },
  },
  watch: {
    // Watch the tags input and update the tagsList array whenever the input changes
    tagsInput(newValue) {
      this.tagsList = newValue
        .split(' ')                 // Split by spaces
        .map(tag => tag.replace('#', '').trim()) // Remove the '#' and trim any extra spaces
        .filter(tag => tag);        // Remove any empty strings
    },
  },
  methods: {
    async submitForm() {
      const newBlog = {
        title: this.title,
        text: this.text,
        tags: this.tagsList, // Send tags as an array
      };

      try {
        const response = await fetch(`http://localhost:3000/blogs/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBlog),
        });

        if (!response.ok) {
          throw new Error('Failed to create the blog');
        }

        // After successfully adding the blog, navigate back to home
        this.$router.push('/');

        // Reset the form fields
        this.resetForm();
      } catch (error) {
        console.error(error);
        alert('Problem creating the blog');
      }
    },

    // Reset form fields after submission
    resetForm() {
      this.title = "";
      this.text = "";
      this.tagsInput = "";
      this.tagsList = [];
    },
  },
};
</script>

<style scoped>
/* Overall container style */
.container {
  max-width: 900px;
  margin-top: 100px;
}

/* Card styling */
.card {
  border-radius: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

/* Form control styling */
.form-control {
  transition: all 0.3s ease-in-out;
  border-radius: 12px;
  padding: 15px;
  border: 2px solid #ccc;
  background-color: #f9f9f9;
}

.form-control:focus {
  border-color: #0069d9;
  box-shadow: 0 0 8px rgba(0, 105, 217, 0.5);
}

/* Label styles */
.form-label {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

/* Button Styling */
.btn-primary {
  background: linear-gradient(45deg, #0069d9, #005cbf);
  border: none;
  transition: all 0.3s ease-in-out;
  padding: 12px;
  font-size: 1.1rem;
  border-radius: 50px;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #005cbf, #0069d9);
  transform: scale(1.05);
}

.btn-primary:disabled {
  background: #b0bec5;
  cursor: not-allowed;
}

/* Custom Input Styling */
.input-custom {
  background: #f2f3f7;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease-in-out;
}

.input-custom:focus {
  background-color: #fff;
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

/* Tags List Styling */
.tags-list ul {
  list-style-type: none;
  padding-left: 0;
}

.tag-item {
  background-color: #f2f3f7;
  border-radius: 12px;
  display: inline-block;
  padding: 6px 12px;
  margin: 5px 5px 5px 0;
  font-size: 0.9rem;
  color: #333;
  border: 1px solid #ddd;
}

/* Spacing and layout adjustments */
.mb-4 {
  margin-bottom: 1.5rem;
}

.d-grid {
  display: grid;
  gap: 10px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .card {
    padding: 20px;
  }
}
</style>
