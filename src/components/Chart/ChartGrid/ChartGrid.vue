<template>
    <transition-group name="slide-fade" tag="g">
        <g class="line-group"
          v-for="(line, index) in lines"
          :key="`${lineValue(line)}-${index}`"
        >
            <line
                :key="`line-${ index }`"
                class="line-group__line"
                x1="0" x2="100%"
                :y1="`${ linePosition(line) }%`" :y2="`${ linePosition(line) }%`"
            ></line>
            <text
                :key="`text-${ index }`"
                class="line-group__text"
                x="0"
                :y="`${ linePosition(line) - 1.5 }%`"
            >{{ lineValue(line) }}</text>
        </g>
    </transition-group>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      required: true,
    },
    lines: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      gridRatio: 0.9,
    };
  },
  methods: {
    stepPercent(line) {
      return 100 / (this.lines - 1) * line;
    },
    linePosition(line) {
      return 99 - this.stepPercent(line - 1) * this.gridRatio;
    },
    lineValue(line) {
      return Math.round(this.max * this.stepPercent(line - 1) / 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.line-group {
    &__line {
        stroke: #ccc;
        stroke-width: 0.25;
    }
    &__text {
        fill: #aaa;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
        font-weight: 300;
    }
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity .15s, transform .15s;
}
.slide-fade-enter{
  opacity: 0;
  transform: translateY(0);
}
.slide-fade-leave-to{
  opacity: 0;
  transform: translateY(-10%);
}
</style>
