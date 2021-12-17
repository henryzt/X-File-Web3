<template>
  <div class="border">
    <div v-for="title in titles" :key="title">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    titles: {
      type: Array,
      default: [],
    },
  },
})
export default class TitleList extends Vue {}
</script>

<style scoped>
</style>
