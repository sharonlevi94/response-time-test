const axios = require('axios'),
  axiosTime = require('../../axios-time')

axiosTime(axios)

export default {
  async read(domain){
    try{
      console.log(domain)
      const response = await axios.get(`https://${domain}.com`)
      console.log(response.timings.elapsedTime)
      return JSON.stringify(response.timings.elapsedTime)
    }
    catch (err){
      console.log(err)
    }
  }
}
