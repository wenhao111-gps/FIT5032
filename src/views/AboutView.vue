<template>
  <div class="about">
    <h1>About Our Library</h1>
    <p>
      Welcome to our digital library! We're dedicated to providing a vast collection of books and
      resources to our community.
    </p>
    <button @click="logOff">Log off</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logOff = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
h1 {
  text-align: center;
}

p {
  text-align: center;
}
</style>
