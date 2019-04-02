import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Mutations
const SET_APPLICATION_WIDTH = 'SET_APPLICATION_WIDTH';
const SET_APPLICATION_HEIGHT = 'SET_APPLICATION_HEIGHT';
const TOGGLE_COLOR_MODE = 'TOGGLE_COLOR_MODE';

// Common
const DAY_MODE_NAME = 'day';
const NIGHT_MODE_NAME = 'night';

export default new Vuex.Store({
  state: {
    applicationWidth: 1200,
    applicationHeight: 300,
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

    activeColorMode: 'day',
    colorModes: {
      day: {
        appBackground: '#ffffff',
        gridLabelsColor: '#96a2aa',
        gridLinesColor: '#f2f4f5',

        controllerButtonColor: '#43484b',
        controllerBackgroundColor: '#ffffff',
        controllerBorderColor: '#e6ecf0',

        colorSchemaControllerColor: '#108be3',
        colorSchemaControllerBackground: '#ffffff',

        tooltipBackground: '#ffffff',
        tooltipBoxShadow: '0 0 1px 1px rgba(0, 0, 0, .1)',
        tooltipDateColor: '#222222',
      },
      night: {
        appBackground: '#242F3E',
        gridLabelsColor: '#546778',
        gridLinesColor: '#293544',

        controllerButtonColor: '#ffffff',
        controllerBackgroundColor: '#242F3E',
        controllerBorderColor: '#344658',

        colorSchemaControllerColor: '#108be3',
        colorSchemaControllerBackground: '#242F3E',

        tooltipBackground: '#242F3E',
        tooltipBoxShadow: '0 0 1px 1px rgba(255, 255, 255, .1)',
        tooltipDateColor: '#ffffff',
      },
    },
  },
  getters: {
    applicationWidth: state => state.applicationWidth,
    applicationHeight: state => state.applicationHeight,
    applicationHeightRatio: state => state.applicationHeightRatio,

    yAxisLinesCount: state => state.yAxisLinesCount,

    zoomOptions: state => state.zoomOptions,

    chartPreviewOptions: state => state.chartPreviewOptions,

    activeColorMode: state => state.activeColorMode,
    activeColorSchema: state => state.colorModes[state.activeColorMode],
  },
  actions: {
    setApplicationWidth({ commit }, payload) {
      commit(SET_APPLICATION_WIDTH, payload);
    },
    setApplicationHeight({ commit }, payload) {
      commit(SET_APPLICATION_HEIGHT, payload);
    },
    toggleMode({ commit }) {
      commit(TOGGLE_COLOR_MODE);
    },
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    [SET_APPLICATION_WIDTH](state, { applicationWidth }) {
      state.applicationWidth = applicationWidth;
    },
    [SET_APPLICATION_HEIGHT](state, { applicationHeight }) {
      state.applicationHeight = applicationHeight;
    },
    [TOGGLE_COLOR_MODE](state) {
      state.activeColorMode = state.activeColorMode === DAY_MODE_NAME
        ? NIGHT_MODE_NAME
        : DAY_MODE_NAME;
    },
  },
  /* eslint-enable no-param-reassign */
});
