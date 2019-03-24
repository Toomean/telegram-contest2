<template>
    <div class="chart">
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            :width="applicationWidth"
            :height="applicationHeight"
            @mousemove="handleMousemove"
            @mouseleave="handleMouseleave"
        >
            <desc>Created for Telegram contest</desc>

            <chart-grid
                :y-axis-max-value="yAxisMaxValue"
                :y-axis-lines-count="yAxisLinesCount"
            />

            <chart-line
                :style="{
                  transform: 'translateX(' + chartOffsetX +  '%)'
                }"
                v-for="( line, index ) in lines"
                :key="`chartline-${ index }`"

                :line-data="line"

                :x-axis-data-colums="xAxisDataColums"
                :y-axis-max-value="yAxisMaxValue"

                :hovered-pos="hoverPosition"

                :is-hovered="isChartHovered"
                :y-axis-scale="yAxisScale"
                :height="applicationHeight"
            />

            <chart-hover
                :style="{
                  transform: 'translateX(' + chartOffsetX +  '%)'
                }"
                :x="hoverPosition"
                :x-axis="xAxisData"
                :y-scale="yAxisScale"
                @x-hover="onXHover"
            />
        </svg>

        <chart-tooltip
          v-if="isChartHovered"
          :chart-pos="chartOffsetX"
          :pos-left="hoverPosition * yAxisScale"
          :tooltip-data="tooltipData"
          :app-width="applicationWidth"
        />

        <svg version="1.1" height="40" width="100%" xmlns="http://www.w3.org/2000/svg">
          <chart-dates
            :style="{
                transform: 'translateX(' + chartOffsetX +  '%)'
              }"
            :dates="xAxisDataColums"
            :y-scale="yAxisScale"
          />
        </svg>

        <chart-zoom
          :zoom-vdr-width="zoomVdrWidth"
          :zoom-vdr-height="zoomVdrHeight"

          @scale-init="onScaleChange"
          @scale-change="onScaleChange"
        >
            <chart-line
                v-for="( line, index ) in lines"
                :key="`chartline-${ index }`"

                :line-data="line"

                :x-axis-data-colums="xAxisDataColums"
                :y-axis-max-value="yAxisMaxValue"

                :y-axis-scale="yAxisScaleMin"

                :height="chartPreviewOptions.height"
                :line-width="chartPreviewOptions.lineWidth"
                :show-circles="chartPreviewOptions.showCircles"
            />
        </chart-zoom>

        <chart-visibility-controller
            :lines="lines"
            @change-visibility="changeVisibility"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ChartGrid from './ChartGrid/ChartGrid.vue';
import ChartLine from './ChartLine/ChartLine.vue';
import ChartDates from './ChartDates/ChartDates.vue';
import ChartVisibilityController from './ChartVisibilityController/ChartVisibilityController.vue';
import ChartHover from './ChartHover/ChartHover.vue';
import ChartTooltip from './ChartTooltip/ChartTooltip.vue';
import ChartZoom from './ChartZoom/ChartZoom.vue';

import { getWeekdayMonthDay } from '@/filters/date';

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
      zoomVdrWidth: 200,
      zoomVdrHeight: 96,
      zoomVdrOffsetLeft: 0,

      dataFormatted: [],

      isChartHovered: false,
      hoverPosition: 0,
    };
  },

  computed: {
    ...mapGetters([
      'applicationWidth',
      'applicationHeight',
      'yAxisLinesCount',
      'chartPreviewOptions',
    ]),

    zoomScale() {
      return this.applicationWidth / this.zoomVdrWidth;
    },
    chartOffsetX: {
      get() {
        return -(this.zoomVdrOffsetLeft / this.zoomVdrWidth * 100);
      },
      set({ left, width }) {
        this.zoomVdrOffsetLeft = left;
        this.zoomVdrWidth = width;
      },
    },

    lines() {
      return this.dataFormatted
        .filter(({ type }) => type === 'line');
    },
    linesVisible() {
      return this.lines
        .filter(({ visible }) => visible);
    },
    columnsOfVisibleLines() {
      return this.linesVisible
        .map(line => line.columns);
    },

    yAxisMaxValue() {
      return Math.ceil(
        Math.max(...this.columnsOfVisibleLines.flat()) / 100,
      ) * 100;
    },
    yAxisScale() {
      return this.applicationWidth / this.xAxisDataColums.length * this.zoomScale;
    },
    yAxisScaleMin() {
      return this.applicationWidth / this.xAxisDataColums.length;
    },

    xAxisData() {
      return this.dataFormatted
        .find(column => column.type === 'x');
    },
    xAxisDataColums() {
      return this.xAxisData.columns;
    },

    tooltipData() {
      return {
        pos: this.hoverPosition,
        date: getWeekdayMonthDay(this.xAxisDataColums[this.hoverPosition]),
        items: this.linesVisible
          .map(({ color, name, columns }) => ({
            color,
            name,
            value: columns[this.hoverPosition],
          })),
      };
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
    onScaleChange({ width, left }) {
      this.zoomVdrWidth = width;
      this.chartOffsetX = { left, width };
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
    position: relative;

    display: inline-flex;
    flex-direction: column;

    &:not(:first-child) {
      margin: 4em 0 0;
    }
}
</style>
