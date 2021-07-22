<template>
  <div>
    <h1>Mock Test</h1>
    <p v-for="(item, i) in newsList" :key="i">{{ item }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      newsList: []
    }
  },
  mounted () {
    axios.get('/mock/news').then(res => {
      console.log(res)
      this.newsList = res.data
    })
  }
}
</script>

<style>

</style>
