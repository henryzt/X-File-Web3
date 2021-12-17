<template>
  <div v-if="isOwner || titles?.length" class="border bg-mainBg py-3">
    <div v-for="(title, index) in titles" :key="title">
      <div class="grid grid-cols-8">
        <div class="number">{{ index + 1 }}</div>
        <div class="title border-dashed">
          {{ title }}
        </div>
      </div>
    </div>
    <!-- add new -->
    <div v-if="isOwner" class="grid grid-cols-8 cursor-pointer">
      <div class="number">+</div>
      <div class="title opacity-60 text-mainGreen" @click="openNewTitleModal">
        Add a new title
      </div>
    </div>
  </div>
  <NewTitleModal ref="modal" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NewTitleModal from "@/components/NewTitleModal.vue";

@Options({
  components: {
    NewTitleModal,
  },
  props: {
    titles: {
      type: Array,
      default: [],
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
  },
})
export default class TitleList extends Vue {
  openNewTitleModal(): void {
    // @ts-expect-error unknown
    this.$refs.modal.open();
  }
}
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
