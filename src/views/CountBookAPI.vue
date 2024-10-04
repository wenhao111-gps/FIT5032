<template>
  <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
      error: null
    }
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-2kee7325dq-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error
        this.jsondata = null
      }
    }
  },
  mounted() {
    this.getBookCountAPI()
  }
}
</script>
