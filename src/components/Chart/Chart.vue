<template>
    <div class="chart">
      y scale: {{ yScale }} {{ zoomScale }}
        <svg height="500" version="1.1" :width="layoutWidth" xmlns="http://www.w3.org/2000/svg"
            @mousemove="handleMousemove"
            @mouseleave="handleMouseleave"
        >
            <desc>Created for Telegram contest</desc>

            <chart-grid
                :max="maxValue"
                :lines="6"
            />

            <chart-line
                :style="{
                  transform: 'translateX(' + chartPos +  '%)'
                }"
                v-for="( line, index ) in lines"
                :key="`chartline-${ index }`"
                :line="line"
                :dates="dates"
                :max="maxValue"
                :hovered-pos="hoverPosition"
                :is-hovered="isChartHovered"
                :y-scale="yScale"
                :height="500"
            />

            <chart-hover
                :style="{
                  transform: 'translateX(' + chartPos +  '%)'
                }"
                :x="hoverPosition"
                :x-axis="xAxis"
                :y-scale="yScale"
                @x-hover="onXHover"
            />
        </svg>

        <chart-tooltip
          v-if="isChartHovered"
          :pos-left="hoverPosition * yScale"
          :tooltip-data="tooltipData"
        />

        <chart-dates
            :dates="dates"
        />

        <chart-zoom
          @scale-change="onScaleChange"
        >
            <chart-line
                v-for="( line, index ) in lines"
                :key="`chartline-${ index }`"
                :line="line"
                :dates="dates"
                :max="maxValue"
                :hovered-pos="hoverPosition"
                :is-hovered="isChartHovered"
                :y-scale="10.714285714285714"

                :height="75"
                :line-width="2"
                :show-circles="false"
            />
        </chart-zoom>

        <chart-visibility-controller
            :lines="lines"
            @change-visibility="changeVisibility"
        />
    </div>
</template>

<script>
import moment from 'moment';

import ChartGrid from './ChartGrid/ChartGrid.vue';
import ChartLine from './ChartLine/ChartLine.vue';
import ChartDates from './ChartDates/ChartDates.vue';
import ChartVisibilityController from './ChartVisibilityController/ChartVisibilityController.vue';
import ChartHover from './ChartHover/ChartHover.vue';
import ChartTooltip from './ChartTooltip/ChartTooltip.vue';
import ChartZoom from './ChartZoom/ChartZoom.vue';

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
    ChartTooltip,
    ChartZoom,
  },

  data() {
    return {
      layoutWidth: 1200,

      zoomScale: 1200 / 200,
      chartPos: -495,

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
    xAxis() {
      return this.dataFormatted
        .find(column => column.type === 'x');
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
    yScale() {
      return this.layoutWidth / this.xAxis.columns.length * this.zoomScale;
    },
    tooltipData() {
      const dataObj = {
        pos: this.hoverPosition,
        date: moment(this.xAxis.columns[this.hoverPosition]).format('ddd, MMM DD'),
        items: this.linesVisible
          .map((line) => {
            const linePoints = line.columns[this.hoverPosition];

            return {
              color: line.color,
              name: line.name,
              value: linePoints,
            };
          }),
      };

      return dataObj;
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
    handleMousemove() {
      if (!this.isChartHovered) {
        this.isChartHovered = true;
      }
    },
    onXHover(xPosition) {
      this.hoverPosition = xPosition;
    },
    handleMouseleave() {
      this.isChartHovered = false;
    },
    onScaleChange({ scale, pos }) {
      console.log(pos);

      this.zoomScale = scale;
      this.chartPos = -pos;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
    position: relative;

    display: inline-flex;
    flex-direction: column;
}
</style>
