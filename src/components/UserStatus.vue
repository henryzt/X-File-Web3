<template>
  <div v-if="!account" @click="login" class="red-button">Connect Wallet</div>
  <div v-else class="flex flex-col items-end cursor-pointer" @click="goToProfile">
    <div class="account text-right">{{ ensName ?? account }}</div>
    <div class="network">· {{ chainName }}</div>
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
export default class Logo extends Vue {
  get account(): string | null {
    return this.$store.state.account;
  }

  get ensName(): string | null {
    return this.$store.state.ensName;
  }

  get chainName(): string | null {
    return this.$store.state.chainName;
  }

  login(): void {
    this.$store.dispatch("login");
  }

  goToProfile(): void {
    if(this.ensName) {
      this.$router.push(`/profile/${this.ensName}`)
    }
  }
}
</script>

<style scoped>
.account {
  @apply w-60 overflow-ellipsis overflow-hidden font-display font-bold text-xl;
}

.network {
  @apply bg-mainRed text-white border-black border-2 rounded-full px-3 text-xs font-medium font-display;
}
</style>
