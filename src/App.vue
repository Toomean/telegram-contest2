<template>
  <div id="app"
    ref="app"
  >
    <chart
      v-for="(chart, index) in [ ...chartData ]"
      :key="index"
      :chartData="chart"
    />
  </div>
</template>

<script>
import ChartDataJSON from '@/assets/chart_data.json';
import Chart from '@/components/Chart/Chart.vue';

import { mapActions } from 'vuex';
import { debounce } from 'lodash';

export default {
  name: 'app',
  components: {
    Chart,
  },
  data() {
    return {
      chartData: ChartDataJSON,
    };
  },
  mounted() {
    this.setAppWidth();

    this.$nextTick(() => {
      window.addEventListener('resize', this.setAppWidth);
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  max-width: 1200px;
  margin: 60px auto;
}
</style>
