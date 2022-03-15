import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import project from "@/store/modules/project";
import issue from "@/store/modules/issue";
import getters from "@/store/getters";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters,
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    project,
    issue
  },


})
