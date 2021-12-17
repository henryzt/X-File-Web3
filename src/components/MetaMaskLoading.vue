<template>
  <div v-if="$store.state.metaMaskLoading">
    <div class="overlay"></div>
    <div class="modal">
      <img class="animate-pulse" src="/img/MetaMask.png" />
      <div class="text-xs text-center font-bold">Waiting for transaction...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    modalTitle: String,
  },
  emits: ["closed"],
})
export default class MetaMaskLoading extends Vue {}
</script>

<style scoped>
.modal {
  @apply w-52 h-56 p-5 px-7;
}
</style>