<template>
    <transition-group
      :name="transitionName" tag="g"
      @beforeEnter="onBeforeEnter"
      mode="in-out"
    >
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
  data() {
    return {
      maxValueGrown: false,
      transitionName: 'slide-fade',
    };
  },
  computed: {
    ...mapGetters([
      'applicationHeightRatio',
      'activeColorSchema',
    ]),
  },
  watch: {
    yAxisMaxValue(newValue, oldValue) {
      this.maxValueGrown = newValue > oldValue;
    },
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

    onBeforeEnter() {
      this.transitionName = this.maxValueGrown ? 'slide-fade' : 'slide-fade-out';
    },
  },
};
</script>

<style lang="scss" scoped>
.line-group {
    &__line {
        transition: stroke .2s;

        stroke: #ccc;
        stroke-width: 0.35;
    }
    &__text {
        transition: fill .2s;

        fill: #aaa;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
        font-weight: 300;
    }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}
.slide-fade-enter,
.slide-fade-leave-to
{
  opacity: 0;
  transform: translateY(18%);
}

.slide-fade-out-enter-active,
.slide-fade-out-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}
.slide-fade-out-enter,
.slide-fade-out-leave-to
{
  opacity: 0;
  transform: translateY(-18%);
}
</style>
