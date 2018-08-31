import axios from 'axios'

var qs = require('qs')
export const arrList = (params) =>{
  return axios.get('http://yxy.weilang.top/index/index/hello').then(res=>res.data)
  // res.header("Access-Control-Allow-Origin","*");
}