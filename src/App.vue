<template>
  <div id="app">
    <h1>Response Time test & record Application</h1>
    <div>
      <button class="buttons" @click="startScan()">Start Test</button>
      <button class="buttons" @click="scanOn = !scanOn">Stop Test</button>
    </div>
    <line-chart
      v-for="(sourceResult, key) of timeResults"
      :key="key" :data="sourceResult"
      :title="sources[key]"/>
  </div>
</template>

<script>
import API from './middleware/api/index'
import localStorageDriver from './middleware/local-storage/index'

export default {
  name: 'App',
  data(){
    return{
      scanOn: false,
      timeResults:[],
      sources: [
        'google.com',
        'facebook.com',
        'twitter.com',
        'ynet.com',
        'amazon.com'
      ]
    }
  },
  methods:{
    async startScan(){
      this.scanOn = true
      while(this.scanOn){
        for(let i= 0 ; i < this.sources.length ; i++){
          let responseTime = await API.read(this.sources[i])
          let time = new Date().getTime()
          this.timeResults[i][time] = responseTime

          console.log(this.timeResults)
          localStorageDriver.updateTimes(this.sources[i],this.timeResults[i])

          for(let i= 0 ; i < this.sources.length ; i++){
            this.timeResults[i] = localStorageDriver.getObjects(this.sources[i])
          }
        }
      }
    }
  },
  created () {
    for(let i= 0 ; i < this.sources.length ; i++){
      this.timeResults.push(localStorageDriver.getObjects(this.sources[i]))
    }
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
