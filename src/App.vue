<template>
  <div id="app">
    <h1>Response Time test & record Application</h1>
    <div>
      <button class="buttons" @click="startScan()">Start Test</button>
      <button class="buttons" @click="scanOn = false">Stop Test</button>
    </div>
    <line-chart
      v-for="(sourceResult, key) of results"
      :key="key"
      :data="sourceResult"
      :title="sources[key]"/>
  </div>
</template>

<script>
import API from './middleware/api/index'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      scanOn: false,
      timeResults: [],
      sources: [
        'Google',
        'Facebook',
        'Twitter',
        'Ynet',
        'Amazon'
      ]
    }
  },
  computed: mapState('results', ['results']),
  methods: {
    ...mapActions('results', ['updateResults', 'getResults']),
    async startScan () {
      this.scanOn = true
      while (this.scanOn) {
        for (let i = 0; i < this.sources.length; i++) {
          let responseTime = await API.read(this.sources[i])
          let time = new Date().getTime()
          this.timeResults[i][time] = responseTime
          console.log(this.timeResults)
          this.updateResults({
            results: this.timeResults,
            type: this.sources[i],
            times: this.timeResults[i]
          })
        }
        this.getResults(this.sources)
      }
    }
  },
  created () {
    this.getResults(this.sources)
    this.timeResults = this.results
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.buttons {
  padding: 10px;
  margin: 10px;
}
</style>
