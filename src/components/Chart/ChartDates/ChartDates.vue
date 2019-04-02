<template>
    <g class="chart-dates">
        <transition-group name="fade"
          tag="g"
          mode="in-out"
        >
            <text
                v-for="(date, index) in dates"
                v-show="isDateShown(index)"
                :key="`chart-date-${ index }`"
                class="chart-dates__text"
                :x="index * yScale"
                y="50%"
            >{{ date | getMonthDay }}</text>
        </transition-group>
    </g>
</template>

<script>
import { getMonthDay } from '@/filters/date';
import { mapGetters } from 'vuex';

export default {
  props: {
    dates: {
      type: Array,
      required: true,
    },
    yScale: {
      type: Number,
      required: true,
    },
  },

  filters: {
    getMonthDay,
  },

  computed: {
    ...mapGetters([
      'applicationWidth',
    ]),
    yScaleRounded() {
      return Math.round(this.yScale);
    },
    dateScaleMultiplier() {
      return this.applicationWidth < 768 ? 15 : 25;
    },
  },

  methods: {
    isDateShown(index) {
      const delimeter = Math.floor(10 / this.yScaleRounded * this.dateScaleMultiplier);

      return index % Math.max(1, delimeter) === 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-dates {
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &__item {
        padding: .5em;

        color: #aaa;
    }

    &__text {
        fill: #aaa;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
        font-weight: 300;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s, transform .2s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
  transform: translateX(-5%)
}
</style>
