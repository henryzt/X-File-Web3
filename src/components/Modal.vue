<template>
  <div class="overlay"></div>
  <div class="modal">
    <div class="font-display font-extrabold text-3xl text-mainGreen mb-12">
      {{ modalTitle }}
    </div>
    <div
      class="
        font-display font-extrabold
        text-3xl text-mainRed
        cursor-pointer
        absolute
        right-10
        top-10
      "
      @click="$emit('closed')"
    >
      x
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    modalTitle: String
  },
  emits: ["closed"]
})
export default class Modal extends Vue {
}
</script>

<style scoped>
</style>
