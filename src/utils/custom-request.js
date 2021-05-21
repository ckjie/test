import axios from 'axios';
export default {
  install(Vue, options) {   // options项可选
    Vue.prototype.myCustom = {
      request({ api, params, method = 'post'}) {
        return new Promise(( resolve, reject ) => {
          axios[method](api, params).then(
            response => {
              if (response.data.code == 0 || response.status === 200) {
                resolve(response.data);
                return;
              }
              reject(response.data);
              return;
            },
            err => {
              reject(err.data);
              return;
            }
          )
        })
      },
      get({url, params}) {
        return new Promise((resolve, reject) => {
          axios.get(url, params).then(
            response => {
              console.log(response, '123')
              if (response.data.code == 0 || response.status === 200) {
                resolve(response.data);
                return;
              }
              reject(response.data);
              return;
            },
            err => {
              reject(err);
              return;
            }
          )
        })
      }
    }
  }
    // Vue.prototype.$request = ({api, params}) => {
    //   return new Promise((resolve, reject) => {
    //     return axios.post(api, params).then(
    //       response => {
    //       if (response.data.code == 0) {
    //         resolve(response.data);
    //         return;
    //       }
    //       reject(response.data);
    //       return;
    //       },
    //       err => {
    //         reject(err.data);
    //         return;
    //       }
    //     )
    //   })
    // }
  // }
}