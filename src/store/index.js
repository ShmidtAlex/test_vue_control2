import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    control0: null, 
    control1: null,
    control2: null,
    runningVal: null,
  },
  mutations: {
    changeControlValue0(state,value){
        state.control0 = value;
    },
    changeControlValue1(state,value){
        state.control1 = value;
    },
    changeControlValue2(state,value){
        state.control2 = value;
    },
    changeRunningVal(state,value) {
      state.runningVal = value;
    }
  },
  actions: {},
  modules: {}
});
