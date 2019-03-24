<template>
    <div
        class="night-mode-controller"
        :style="controllerStyles"
        @click="toggleMode"
    >
        Switch to {{ activeColorMode === 'day' ? 'night' : 'day' }} mode
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'activeColorMode',
      'activeColorSchema',
    ]),

    controllerStyles() {
      return {
        background: this.activeColorSchema.colorSchemaControllerBackground,
        color: this.activeColorSchema.colorSchemaControllerColor,
      };
    },
  },
  methods: {
    ...mapActions([
      'toggleMode',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.night-mode-controller {
    transition: background-color .2s, color .2s;

    position: fixed;
    bottom: 0;
    left: 0;

    width: 100%;
    padding: 2em 0;

    color: #108be3;
    background: #fff;

    box-shadow: 0 -1px 2px 2px rgba(0, 0, 0, .05);

    cursor: pointer;
}
</style>
