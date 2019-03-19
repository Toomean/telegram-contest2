<template>
    <g>
        <transition name="line">
            <path v-if="line.visible"
                :class="['line']"
                :style="{
                    fill: 'none',
                    strokeWidth: 3,
                    stroke: line.color,
                }"
                :d="`M${ points.slice(0,2) }L${ points.slice(2) }`"
            ></path>
        </transition>
        <transition name="line">
          <g v-if="line.visible && isHovered">
            <circle
              class="circle"
              :cx="circleToShow[0]"
              :cy="circleToShow[1]"
              :style="{
                fill: '#ffffff',
                stroke: line.color,
                strokeWidth: 3,
              }"
              r="5"
            ></circle>
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
  },

  data() {
    return {
      height: 500,
      circleToShow: [],
    };
  },

  computed: {
    heightRatio() {
      return 500 / this.max * 0.9;
    },
    points() {
      return this.dates
        .map((date, index) => (
          [index * 10, this.height - this.line.columns[index] * this.heightRatio]
        ))
        .flat();
    },
    circlePoints() {
      return chunk(this.points, 2);
    },
    // circleToShow() {
    //   return this.circlePoints
    //     .find(point => this.hoveredPos >= point[0] - 3 && this.hoveredPos <= point[0] + 3);
    // },
  },

  watch: {
    hoveredPos(value) {
      const posFound = this.circlePoints
        .find(point => value >= point[0] - 3 && value <= point[0] + 3);

      if (posFound) {
        this.circleToShow = posFound;
        this.$emit('pos-found', this.line.columns[posFound[0] / 10]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
    fill: none;

    transition: d .25s;
}
.circle {
  position: relative;
  z-index: 100;
  transition: cy .25s, cx .25s;
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
