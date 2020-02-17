import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'    // 持久化 vuex 插件

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',   // 根据环境开启严格模式（开发环境开启，生产环境关闭），无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
  plugins: [createPersistedState()],
  state: {
    name: '乔鲁诺-乔巴纳',
    age: 18,
    userList: [
      { id: 1, name: '琦玉氏', sex: 'man' },
      { id: 2, name: '杰诺斯', sex: 'man' },
      { id: 3, name: '战栗龙卷', sex: 'woman' },
      { id: 4, name: '地狱吹雪', sex: 'woman' },
      { id: 5, name: '童帝', sex: 'man' },
      { id: 6, name: '清炭', sex: 'unknown' }
    ]
  },
  getters: {
    filterName(state) {
      return state.name.replace('-', '+');
    },
    filterManUser: (state) => {
      return state.userList.filter(user => user.sex === 'man');
    },
    customFilterUser: (state) => (sex) => {
      return state.userList.filter(user => user.sex === sex);
    }
  },
  mutations: {
    setName(state, name) {
      state.name = name
    }
  },
  actions: {
    setAgainName({ commit }, name) {
      setTimeout(() => {
        commit('setName', name)
      }, 2000)
    }
  }
})