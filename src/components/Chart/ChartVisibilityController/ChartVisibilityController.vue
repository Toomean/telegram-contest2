<template>
    <div class="visibility-controllers">
        <div class="visibility-controllers__item"
            :class="{ 'visibility-controllers__item--visible': line.visible }"
            :style="controllerStyles"
            v-for="(line, index) in lines"
            :key="`line-controller-${ index }`"
            @click="changeVisibility(line)"
        >
            <div class="visibility-controllers__icon"
                :style="{ backgroundColor: line.color }"
            >
                <font-awesome-icon v-if="line.visible" icon="check" />
            </div>
            <div class="visibility-controllers__text">{{ line.name }}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    lines: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters([
      'activeColorSchema',
    ]),

    controllerStyles() {
      return {
        color: this.activeColorSchema.controllerButtonColor,
        borderColor: this.activeColorSchema.controllerBorderColor,
        background: this.activeColorSchema.controllerBackgroundColor,
      };
    },
  },

  methods: {
    changeVisibility(line) {
      this.$emit('change-visibility', { name: line.name, visible: !line.visible });
    },
  },
};
</script>

<style lang="scss" scoped>
.visibility-controllers {
    $bl: '.visibility-controllers';

    display: flex;
    margin: 2em 0;

    &__item {
        transition: color .2s, border-color .2s, background-color .2s;

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
