'use strict'

export default {
  getObjects:(objType)=>{
    let result = localStorage.getItem(objType)
    if(result === null){
      result = '{}'
    }
    return JSON.parse(result)
  },
  updateTimes: (type, times)=>{
    localStorage.setItem(type, JSON.stringify(times))
  }
}

