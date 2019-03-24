<template>
  <g>
    <transition name="line">
      <path v-if="line.visible"
        :class="['line']"
        :style="{
            fill: 'none',
            strokeWidth: lineWidth,
            stroke: line.color,
        }"
        :d="`M${ points.slice(0,2) }L${ points.slice(2) }`"
      />
    </transition>
    <transition name="line">
      <g v-if="showCircles && line.visible && isHovered">
        <circle
          class="circle"
          :cx="circleToShow[0 * yScale]"
          :cy="circleToShow[1]"
          :style="{
            fill: '#ffffff',
            stroke: line.color,
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

export default {
  props: {
    line: {
      type: Object,
      required: true,
    },
    dates: {
      type: Array,
      required: true,
    },
    max: {
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
    yScale: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      default: 500,
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
    heightRatio() {
      return this.height / this.max * 0.9;
    },
    points() {
      return this.dates
        .map((date, index) => (
          [index * this.yScale, this.height - this.line.columns[index] * this.heightRatio]
        ))
        .flat();
    },
    circlePoints() {
      return chunk(this.points, 2);
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
