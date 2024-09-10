<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const userEmail = ref('')
const userRole = ref('')
const userId = ref('')

const getUserData = async (uid) => {
  console.log('Fetching user data: ', uid)
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const userData = docSnap.data()
    userEmail.value = userData.email
    userRole.value = userData.role
    console.log('User data from Firestore: ', userData)
  } else {
    console.log('No such user.')
  }
}

onMounted(() => {
  const user = auth.currentUser
  if (user) {
    console.log('Current User: ', user)
    userId.value = user.uid
    getUserData(userId.value)
  } else {
    console.log('No user logged in.')
    router.push('/login')
  }
})

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('User signed out!')
      router.push('/login')
    })
    .catch((error) => {
      console.error('Error signing out: ', error)
    })
}
</script>

<template>
  <h1>User Profile</h1>
  <p><strong>Email:</strong> {{ userEmail || 'No Email' }}</p>
  <p><strong>Role:</strong> {{ userRole || 'No role' }}</p>
  <p><button @click="logout">Logout</button></p>
</template>
