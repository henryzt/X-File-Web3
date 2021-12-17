<template>
  <div v-if="titles?.length" class="border bg-mainBg py-3">
    <div v-for="(title, index) in titles" :key="title">
      <div class="grid grid-cols-8">
        <div class="number">{{ index + 1 }}</div>
        <div class="title">
          {{ title }}
        </div>
      </div>
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
.number {
  @apply font-display
          text-2xl
          font-bold
          text-white
          rounded-full
          border-2 border-black
          bg-mainRed
          w-10
          h-10
          leading-9
          my-auto
          ml-auto
          mr-2;
}

.title {
  @apply col-span-7
          border-2 border-black
          border-dashed
          rounded-lg
          px-3
          py-1
          mx-5
          my-3
          text-left
          font-display font-bold
          bg-white;
}
</style>
