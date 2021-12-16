import { createStore } from 'vuex';

export default createStore({
  state: {
    solApp: null
  },
  mutations: {
    setApp(state, app) {
      state.solApp = app
    }
  },
  actions: {
  },
  modules: {
  },
});
