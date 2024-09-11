<template>
  <div>
    <h1>Books with ISBN</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="editBook(book)">Edit</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>

    <div v-if="editingBook">
      <h2>Edit Book</h2>
      <input v-model="editName" placeholder="Enter new book name" />
      <input v-model="editIsbn" placeholder="Enter new ISBN" />
      <button @click="updateBook">Update Book</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const editingBook = ref(null)
    const editName = ref('')
    const editIsbn = ref('')

    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'asc'),
          limit(10)
        )
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    const deleteBook = async (bookId) => {
      try {
        await deleteDoc(doc(db, 'books', bookId))
        books.value = books.value.filter((book) => book.id !== bookId)
      } catch (error) {
        console.error('Error deleting book: ', error)
      }
    }

    const editBook = (book) => {
      editingBook.value = book
      editName.value = book.name
      editIsbn.value = book.isbn
    }

    const updateBook = async () => {
      if (!editingBook.value) return
      try {
        const bookDoc = doc(db, 'books', editingBook.value.id)
        await updateDoc(bookDoc, {
          name: editName.value,
          isbn: Number(editIsbn.value)
        })

        const updateBookIndex = books.value.findIndex((book) => book.id === editingBook.value.id)
        books.value[updateBookIndex].name = editName.value
        books.value[updateBookIndex].isbn = Number(editIsbn.value)

        editingBook.value = null
        editName.value = ''
        editIsbn.value = ''
      } catch (error) {
        console.error('Error updating book: ', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      editBook,
      deleteBook,
      updateBook,
      editingBook,
      editName,
      editIsbn
    }
  }
}
</script>
