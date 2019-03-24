<template>
  <g>
    <transition name="line">
      <path v-if="lineData.visible"
        :class="['line']"
        :style="{
            fill: 'none',
            strokeWidth: lineWidth,
            stroke: lineData.color,
        }"
        :d="`M${ linePoints.slice(0,2) }L${ linePoints.slice(2) }`"
      />
    </transition>
    <transition name="line">
      <g v-if="showCircles && lineData.visible && isHovered">
        <circle
          class="circle"
          :cx="circleToShow[0 * yAxisScale]"
          :cy="circleToShow[1]"
          :style="{
            fill: '#ffffff',
            stroke: lineData.color,
            strokeWidth: 3,
          }"
          r="5"
        />
      </g>
    </transition>
  </g>
</template>

<script>
import { chunk } from 'lodash';
import { mapGetters } from 'vuex';

export default {
  props: {
    lineData: {
      type: Object,
      required: true,
    },
    xAxisDataColums: {
      type: Array,
      required: true,
    },
    yAxisMaxValue: {
      type: Number,
      required: true,
    },
    hoveredPos: {
      type: Number,
      default: 0,
    },
    isHovered: {
      type: Boolean,
      default: false,
    },
    yAxisScale: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    lineWidth: {
      type: Number,
      default: 3,
    },
    showCircles: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      circleToShow: [],
    };
  },

  computed: {
    ...mapGetters([
      'applicationHeightRatio',
    ]),
    heightRatio() {
      return this.height / this.yAxisMaxValue * this.applicationHeightRatio;
    },
    linePoints() {
      return this.xAxisDataColums
        .map((date, index) => (
          [index * this.yAxisScale, this.height - this.lineData.columns[index] * this.heightRatio]
        ))
        .flat();
    },
    circlePoints() {
      return chunk(this.linePoints, 2);
    },
  },

  watch: {
    hoveredPos(value) {
      this.circleToShow = [
        this.circlePoints[value][0],
        this.circlePoints[value][1],
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
    fill: none;

    // transition: d .25s;
}
.circle {
  position: relative;
  z-index: 100;
  transition: cy .15s, cx .15s;
}

.line-enter-active, .line-leave-active {
  transition: opacity .25s, transform .25s;
}
.line-enter, .line-leave-to{
  opacity: 0;
  transform: translateY(-50%);
}

.line-fade-enter-active, .line-fade-leave-active {
  transition: opacity .25s;
}
.line-fade-enter, .line-fade-leave-to{
  opacity: 0;
}
</style>
