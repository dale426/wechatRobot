const axios = require('axios');
const QS = require('qs');
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 10000,
  // headers: { "Content-Type": "application/x-www-form-urlencoded; charset=GB2312" },
  headers: { "Content-Type": "text/plain; charset=utf-8" },
  responseType: "json"
});


// 请求拦截
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = "store.state.token;"
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.reject(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
  });


/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
const get = function(url, params){
  return new Promise((resolve, reject) =>{
    instance.get(url, {
          params: params
      })
      .then(res => {
          resolve(res.data);
      })
      .catch(err => {
          reject(err.data)
      })
  });
}
/**
* post方法，对应post请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
const post = function(url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, QS.stringify(params))
      .then(res => {
          resolve(res.data);
      })
      .catch(err => {
          reject(err.data)
      })
  })
}
module.exports = {
    get, post
}