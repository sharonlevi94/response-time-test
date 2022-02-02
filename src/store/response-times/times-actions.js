import localStorageDriver from '../../middleware/local-storage/index'
export default {
  getResults: ({commit},sources)=>{
    let results = []
    for(let i= 0 ; i < sources.length ; i++){
      results.push(localStorageDriver.getObjects(sources[i]))
    }
    commit('setResults',results)
  },
  updateResults: ({commit}, options) => {
    console.log(options)
    localStorageDriver.updateTimes(options.type, options.times)
    commit('setResults', options.results)
  }
}
