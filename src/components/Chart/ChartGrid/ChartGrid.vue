<template>
    <transition-group name="slide-fade" tag="g">
        <g class="line-group"
          v-for="(line, index) in yAxisLinesCount"
          :key="`${lineValue(line)}-${index}`"
        >
            <line
                :key="`line-${ index }`"
                class="line-group__line"
                :stroke="lineColor"
                x1="0" x2="100%"
                :y1="`${ linePosition(line) }%`" :y2="`${ linePosition(line) }%`"
            ></line>
            <text
                :key="`text-${ index }`"
                class="line-group__text"
                :fill="labelColor"
                x="0"
                :y="`${ linePosition(line) - 1.5 }%`"
            >{{ lineValue(line) }}</text>
        </g>
    </transition-group>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    yAxisMaxValue: {
      type: Number,
      required: true,
    },
    yAxisLinesCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'applicationHeightRatio',
      'activeColorSchema',
    ]),
  },
  methods: {
    stepPercent(line) {
      return 100 / (this.yAxisLinesCount - 1) * line;
    },
    linePosition(line) {
      return 99 - this.stepPercent(line - 1) * this.applicationHeightRatio;
    },
    lineValue(line) {
      return Math.round(this.yAxisMaxValue * this.stepPercent(line - 1) / 100);
    },

    lineColor() {
      return this.activeColorSchema.gridLinesColor;
    },
    labelColor() {
      return this.activeColorSchema.gridLabelsColor;
    },
  },
};
</script>

<style lang="scss" scoped>
.line-group {
    &__line {
        transition: stroke .2s;

        stroke: #ccc;
        stroke-width: 0.15;
    }
    &__text {
        transition: fill .2s;

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
