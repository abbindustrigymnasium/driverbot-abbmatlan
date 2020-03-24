import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  loadingStatus: "not loading",
  // logger:"",
  logger: [],
  connect: false,
  loglimit: 10,
  user: {
    name: "mathias.landstrom@abbindustrigymnasium.se",
    password: "losenord",
    port: 8883,
    adress: "maqiatto.com"
  }
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  Loading_Status(state, Status) {
    state.loadingStatus = Status;
  },
  clear_Logger(state) {
    // state.logger = "";
    state.logger = [];
  },
  Connect_(state, status) {
    state.connect = status;
  },
  Set_User(state, data) {
    state.user = data;
  },
  add_To_Logger(state, text) {
    if (state.loglimit <= state.logger.length) {
      state.logger.shift();
    }
    state.logger.push(text);
    // state.logger += text;
  },
  Save_: (state, user) => {

    state.user = user;
  },
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  LoadingStatus: ({
    commit
  }, Status) => {

    commit('Loading_Status', Status);
  },
  addToLogger: ({
    commit
  }, text) => {

    commit('add_To_Logger', text);
  },
  clearLogger: ({
    commit
  }) => {

    commit('clear_Logger');
  },
  Connect: ({
    commit
  }, status) => {

    commit('Connect_', status);
  },
  SetUser: ({
    commit
  }, data) => {

    commit('Set_User', data);
  },

  Save: ({
    commit
  }, user) => {

    commit('Save_', user);
  },
}

// getters are functions
const getters = {
  logger: state => state.logger,
  connected: state => state.connect,
  GetUser: state => state.user,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})