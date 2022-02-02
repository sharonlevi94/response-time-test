const axios = require('axios'),
  axiosTime = require('../../axios-time')

axiosTime(axios)

export default {
  async read(url){
    try{
      console.log(url)
      const response = await axios.get(`https://${url}`)
      console.log(response.timings.elapsedTime)
      return JSON.stringify(response.timings.elapsedTime)
    }
    catch (err){
      console.log(err)
    }
  }
}
