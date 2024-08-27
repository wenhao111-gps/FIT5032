<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <h1 class="heading">Login</h1>
        <form @submit.prevent="login">
          <div class="row justify-content-center">
            <div class="col-6 mb-3">
              <label for="username" class="form-label">Username:</label>
              <input type="text" class="form-control" id="username" v-model="formData.username" />
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-6 mb-3">
              <label for="password" class="form-label">Password:</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const formData = ref({
  username: '',
  password: ''
})

const router = useRouter()

const login = () => {
  if (formData.value.username === 'admin' && formData.value.password === '123456') {
    router.push('/about')
    localStorage.setItem('token', 'admin')
  } else {
    alert('The username or password is wrong')
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}

.heading {
  font-family: 'Arial', sans-serif;
  font-size: 3rem;
  letter-spacing: 2px;
  color: #4a90e2;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
