<template>
  <div v-if="!account" @click="login" class="red-button">Connect Wallet</div>
  <div v-else>{{ account }} | {{ chainName }}</div>
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

  get chainName(): string | null {
    return this.$store.state.chainName;
  }

  login(): void {
    this.$store.dispatch("login");
  }
}
</script>

<style scoped>
</style>
