import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_APPLICATION_WIDTH = 'SET_APPLICATION_WIDTH';

export default new Vuex.Store({
  state: {
    applicationWidth: 1200,
    applicationHeight: 500,
    applicationHeightRatio: 0.9,

    yAxisLinesCount: 6,

    zoomOptions: {
      isActive: true,
      parentLimitation: true,
      preventActiveBehavior: true,
      axis: 'x',
      sticks: ['ml', 'mr'],
    },

    chartPreviewOptions: {
      height: 75,
      lineWidth: 2,
      showCircles: false,
    },
  },
  getters: {
    applicationWidth: state => state.applicationWidth,
    applicationHeight: state => state.applicationHeight,
    applicationHeightRatio: state => state.applicationHeightRatio,

    yAxisLinesCount: state => state.yAxisLinesCount,

    zoomOptions: state => state.zoomOptions,

    chartPreviewOptions: state => state.chartPreviewOptions,
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
