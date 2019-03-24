import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_APPLICATION_WIDTH = 'SET_APPLICATION_WIDTH';

export default new Vuex.Store({
  state: {
    applicationWidth: 1200,
    applicationHeight: 500,
    applicationHeightRatio: 0.9,

    zoomOptions: {
      isActive: true,
      parentLimitation: true,
      preventActiveBehavior: true,
      axis: 'x',
      sticks: ['ml', 'mr'],
    },
  },
  getters: {
    applicationWidth: state => state.applicationWidth,
    applicationHeight: state => state.applicationHeight,
    applicationHeightRatio: state => state.applicationHeightRatio,

    zoomOptions: state => state.zoomOptions,
  },
  actions: {
    setApplicationWidth({ commit }, payload) {
      commit(SET_APPLICATION_WIDTH, payload);
    },
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    [SET_APPLICATION_WIDTH](state, { applicationWidth }) {
      state.applicationWidth = applicationWidth;
    },
  },
  /* eslint-enable no-param-reassign */
});
