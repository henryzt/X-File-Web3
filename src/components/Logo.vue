<template>
  <div :class="['text-mainGreen', 'font-bold', large ? 'text-6xl' : 'text-3xl']">
    X-Files
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    large: {
      type: Boolean,
      default: false,
    },
  },
})
export default class Logo extends Vue {}
</script>

<style scoped>
</style>
