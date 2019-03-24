<template>
  <div
    id="app"
    class="app"
    :style="appStyles"
  >
    <div
      class="app__wrapper"
      ref="app"
    >
      <chart
        v-for="(chart, index) in [ ...chartData ]"
        :key="index"
        :chartData="chart"
      />

      <night-mode-controller />
    </div>
  </div>
</template>

<script>
import ChartDataJSON from '@/assets/chart_data.json';
import Chart from '@/components/Chart/Chart.vue';
import NightModeController from '@/components/NightModeController/NightModeController.vue';

import { mapActions, mapGetters } from 'vuex';
import { debounce } from 'lodash';

export default {
  name: 'app',
  components: {
    Chart,
    NightModeController,
  },
  data() {
    return {
      chartData: ChartDataJSON,
    };
  },
  computed: {
    ...mapGetters([
      'activeColorSchema',
    ]),
    appStyles() {
      return {
        background: this.activeColorSchema.appBackground,
      };
    },
  },
  mounted() {
    this.setAppWidth();

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.setAppWidth();
      });
    });
  },
  methods: {
    ...mapActions([
      'setApplicationWidth',
    ]),

    setAppWidth() {
      const applicationWidth = this.$refs.app.clientWidth;
      this.setApplicationWidth({ applicationWidth });
    },
  },
};
</script>

<style lang="scss">

body {
  margin: 0;
  padding: 0;
}

.app {
  transition: background-color .2s;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 1em;

  &__wrapper {
    padding: 60px 0 4em;
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
