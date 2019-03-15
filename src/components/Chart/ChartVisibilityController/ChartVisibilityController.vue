<template>
    <div class="visibility-controllers">
        <div class="visibility-controllers__item"
            v-for="(line, index) in lines"
            :key="`line-controller-${ index }`"
            @click="changeVisibility(line)"
        >
            <div class="visibility-controllers__icon"
                :style="{ backgroundColor: line.color }"
            >
                <font-awesome-icon icon="check" />
            </div>
            <div class="visibility-controllers__text">{{ line.name }}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    lines: {
      type: Array,
      required: true,
    },
  },

  methods: {
    changeVisibility(line) {
      this.$emit('change-visibility', line.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.visibility-controllers {
    display: flex;
    margin: 2em 0;

    &__item {
        display: flex;
        align-items: center;

        padding: .5em 1em .5em .5em;
        border: 1px solid #ccc;
        border-radius: 2em;

        cursor: pointer;

        &:not(:first-child) {
            margin: 0 0 0 1em;
        }
    }

    &__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        width: 1.5em;
        height: 1.5em;
        margin: 0 1em 0 0;
        border-radius: 50%;

        background: #ccc;
        color: #fff;
    }
}
</style>
