<template>
    <div class="chart">
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

        <chart-visibility-controller
            :lines="lines"
            @change-visibility="changeVisibility"
        />
    </div>
</template>

<script>
import ChartGrid from './ChartGrid/ChartGrid.vue';
import ChartLine from './ChartLine/ChartLine.vue';
import ChartVisibilityController from './ChartVisibilityController/ChartVisibilityController.vue';

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
    ChartVisibilityController,
  },

  data() {
    return {
      dataFormatted: [],
    };
  },

  computed: {
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

  mounted() {
    this.dataFormatted = this.chartData.columns
      .map((column) => {
        const columnId = column[0];

        return {
          name: this.chartData.names[columnId] || null,
          type: this.chartData.types[columnId] || null,
          color: this.chartData.colors[columnId] || null,
          visible: true,
          columns: column.slice(1),
        };
      });
  },

  methods: {
    changeVisibility(lineName) {
      const lineByName = this.dataFormatted
        .find(item => item.name === lineName);

      lineByName.visible = !lineByName.visible;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
    display: inline-flex;
    flex-direction: column;
}
</style>
