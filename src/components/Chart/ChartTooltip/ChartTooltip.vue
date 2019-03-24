<template>
    <div class="chart-tooltip"
        :style="{
            left: posLeft + 'px',
            transform: 'translateX(' + appWidth * chartPos / 100 + 'px)',
        }"
        ref="tooltip"
    >
        <div class="chart-tooltip__container"
            :style="{ ...tooltipContainerStyle, ...tooltipStyle }"
        >
            <div class="chart-tooltip__date"
                :style="tooltipDateStyle"
            >{{ tooltipData.date }}</div>
            <ul class="chart-tooltip__data-list">
                <li class="chart-tooltip__data-item"
                    v-for="(item, index) in tooltipData.items"
                    :key="`tooltip-item-${ index }`"
                    :style="{
                        color: item.color,
                    }"
                >
                    <div class="chart-tooltip__data-item-value">
                        {{ item.value }}
                    </div>
                    <div class="chart-tooltip__data-item-name">
                        {{ item.name }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    posLeft: {
      type: Number,
      default: 0,
    },
    tooltipData: {
      type: Object,
      default: null,
    },
    chartPos: {
      type: Number,
      required: true,
    },
    appWidth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tooltipleftPosition: 0,
    };
  },

  watch: {
    posLeft() {
      this.setTooltipLeft();
    },
  },

  mounted() {
    this.$nextTick(this.setTooltipLeft);
  },

  computed: {
    ...mapGetters([
      'activeColorSchema',
      'applicationWidth',
    ]),

    tooltipStyle() {
      return {
        left: this.tooltipleftPosition,
      };
    },
    tooltipDateStyle() {
      return {
        color: this.activeColorSchema.tooltipDateColor,
      };
    },
    tooltipContainerStyle() {
      return {
        background: this.activeColorSchema.tooltipBackground,
        boxShadow: this.activeColorSchema.tooltipBoxShadow,
      };
    },
  },

  methods: {
    setTooltipLeft() {
      const bodyWidth = document.body.clientWidth;
      const { applicationWidth } = this;
      const tooltipOffset = this.$refs.tooltip.getBoundingClientRect().left;
      const tooltipWidth = this.$refs.tooltip.clientWidth;
      const tooltipYPosition = tooltipOffset - tooltipWidth / 2 - (bodyWidth - applicationWidth) / 2;

      if (tooltipYPosition < tooltipWidth) {
        this.tooltipleftPosition = '50%';
      } else if (tooltipYPosition + tooltipWidth > this.applicationWidth - tooltipWidth) {
        this.tooltipleftPosition = '-50%';
      } else {
        this.tooltipleftPosition = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-tooltip {
    position: absolute;
    top: 0;
    left: 0;

    transform: translateX(-50%);
    transition: transform .1s;

    pointer-events: none;

    &__container {
        transition: box-shadow .2s ease, background-color .2s ease, left .1s ease;

        transform: translateX(-50%);

        position: relative;

        padding: .4em .8em;
        border-radius: .5em;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);

        background: #fff;

        text-align: left;
    }

    &__date {
        transition: color .2s ease;

        margin: 0 0 .5em;

        font-weight: 500;
        white-space: nowrap;
    }

    &__data-list {
        margin: 0;
        padding: 0;
        list-style: none;

        display: flex;
    }

    &__data-item {
        &:not(:last-child) {
            margin: 0 1em 0 0;
        }
    }

    &__data-item-value {
        font-weight: bold;
        font-size: 1.15em;
    }

    &__data-item-name {
        font-size: .85em;
    }
}
</style>
