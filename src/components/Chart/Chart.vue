<template>
    <div>
        <svg height="500" version="1.1" width="1200" xmlns="http://www.w3.org/2000/svg">
            <desc>Created for Telegram contest</desc>

            <chart-grid
                :max="maxValue"
                :lines="6"
            />

            <chart-line
                v-for="( line, index ) in lines"
                :key="`chartline-${ index }`"
                :line="line"
                :dates="dates"
                :max="maxValue"
            />
        </svg>
    </div>
</template>

<script>
import ChartGrid from './ChartGrid/ChartGrid.vue';
import ChartLine from './ChartLine/ChartLine.vue';

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },

  components: {
    ChartGrid,
    ChartLine,
  },

  computed: {
    dataFormatted() {
      return this.chartData.columns
        .map((column) => {
          const columnId = column[0];

          return {
            name: this.chartData.names[columnId] || null,
            type: this.chartData.types[columnId] || null,
            color: this.chartData.colors[columnId] || null,
            columns: column.slice(1),
          };
        });
    },
    maxValue() {
      return Math.round(
        Math.max(...this.linesColumns.flat()) / 100,
      ) * 100;
    },
    lines() {
      return this.dataFormatted
        .filter(column => column.type === 'line');
    },
    linesColumns() {
      return this.lines
        .map(line => line.columns);
    },
    dates() {
      return this.dataFormatted
        .find(column => column.type === 'x')
        .columns;
    },
  },
};
</script>

<style>

</style>
