<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const role = ref('user')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      const user = data.user
      console.log('Firebase Register Successful!')

      return setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role.value
      })
    })
    .then(() => {
      console.log('User role saved in Firestore!')
      router.push('FireLogin')
    })
    .catch((error) => {
      console.error('Error registering: ', error.code, error.message)
    })
}
</script>

<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <select v-model="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  </p>
  <p><button @click="register">Save to Firebase</button></p>
</template>
