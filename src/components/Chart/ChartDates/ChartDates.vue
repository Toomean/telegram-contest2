<template>
    <div class="chart-dates">
        <div class="chart-dates__item"
            v-for="(date, index) in datesShortens"
            :key="`date-item-${index}`"
        >
            {{ date }}
        </div>
    </div>
</template>

<script>
import { chunk } from 'lodash';
import moment from 'moment';

export default {
  props: {
    dates: {
      type: Array,
      required: true,
    },
  },

  computed: {
    chunkSize() {
      const recommendedSize = Math.round(this.dates.length / 6);

      return recommendedSize < 6 ? 6 : recommendedSize;
    },
    datesShortens() {
      const datesChunk = chunk(this.dates, this.chunkSize);

      /* eslint-disable no-bitwise */
      return datesChunk
        .map(chunkItem => chunkItem[chunkItem.length / 2 | 0])
        .map(middleDate => moment(middleDate).format('MMM DD'));
      /* eslint-enable no-bitwise */
    },
  },

  methods: {
    chunk,
  },
};
</script>

<style lang="scss" scoped>
.chart-dates {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__item {
        padding: .5em;

        color: #aaa;
    }
}
</style>
