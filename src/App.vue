<template>
  <div id="app">
    <chart
      v-for="(chart, index) in [ ...chartData[0] ]"
      :key="index"
      :chartData="chart"
    />
  </div>
</template>

<script>
import ChartDataJSON from '@/assets/chart_data.json';
import Chart from '@/components/Chart/Chart.vue';

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
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
