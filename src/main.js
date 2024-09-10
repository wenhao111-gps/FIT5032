// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(router)
app.mount('#app')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB_XBt8gJiCaUH3bT_NKQz4RhDosRy25-s',
  authDomain: 'week7-wenhao.firebaseapp.com',
  projectId: 'week7-wenhao',
  storageBucket: 'week7-wenhao.appspot.com',
  messagingSenderId: '43818544667',
  appId: '1:43818544667:web:5617da3dfb7de03f7712be'
}

// Initialize Firebase
initializeApp(firebaseConfig)
