<template>
    <div class="chart">
        <svg height="500" version="1.1" width="1200" xmlns="http://www.w3.org/2000/svg"
            @mousemove="handleMousemove"
            @mouseleave="handleMouseleave"
        >
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
                :hoveredPos="hoverPosition"
                :is-hovered="isChartHovered"

                @pos-found="handlePosFound"
            />

            <chart-hover
                v-if="isChartHovered"
                :x="hoverPosition"
            />
        </svg>

        {{ isChartHovered }}

        <chart-dates
            :dates="dates"
        />

        <chart-visibility-controller
            :lines="lines"
            @change-visibility="changeVisibility"
        />
    </div>
</template>

<script>
import ChartGrid from './ChartGrid/ChartGrid.vue';
import ChartLine from './ChartLine/ChartLine.vue';
import ChartDates from './ChartDates/ChartDates.vue';
import ChartVisibilityController from './ChartVisibilityController/ChartVisibilityController.vue';
import ChartHover from './ChartHover/ChartHover.vue';

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
    ChartDates,
    ChartVisibilityController,
    ChartHover,
  },

  data() {
    return {
      dataFormatted: [],

      isChartHovered: false,
      hoverPosition: 0,
    };
  },

  computed: {
    maxValue() {
      return Math.round(
        Math.max(...this.visibleLinesColumns.flat()) / 100,
      ) * 100;
    },
    lines() {
      return this.dataFormatted
        .filter(column => column.type === 'line');
    },
    visibleLinesColumns() {
      return this.lines
        .filter(line => line.visible)
        .map(line => line.columns);
    },
    linesVisible() {
      return this.dataFormatted
        .filter(item => item.type === 'line' && item.visible);
    },
    dates() {
      return this.dataFormatted
        && this.dataFormatted
          .find(column => column.type === 'x')
          .columns;
    },
  },

  created() {
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
    changeVisibility({ name, visible }) {
      if (this.linesVisible.length === 1 && visible === false) {
        return;
      }

      const lineByName = this.dataFormatted
        .find(item => item.name === name);

      lineByName.visible = visible;
    },
    handleMousemove($event) {
      if (!this.isChartHovered) {
        this.isChartHovered = true;
      }

      this.hoverPosition = $event.offsetX;
    },
    handleMouseleave() {
      this.isChartHovered = false;
    },
    handlePosFound(point) {
      console.log(point);
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
