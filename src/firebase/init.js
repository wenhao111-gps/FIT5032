// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

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

const db = getFirestore()
export default db
