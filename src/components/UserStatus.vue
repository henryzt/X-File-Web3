<template>
  <div v-if="!account" @click="login" class="red-button">Connect Wallet</div>
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
export default class Logo extends Vue {
  get account(): string | null {
    return this.$store.state.account;
  }

  login(): void {
    this.$store.dispatch("login");
  }
}
</script>

<style scoped>
</style>
