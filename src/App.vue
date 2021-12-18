<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :key="$route.path" :is="Component" />
    </transition>
  </router-view>
  <MetaMaskLoading />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MetaMaskLoading from "@/components/MetaMaskLoading.vue";

@Options({
  components: {
    MetaMaskLoading,
  },
})
export default class App extends Vue {
  async created(): Promise<void> {
    await this.$store.dispatch("initWeb3Account");
    await this.$store.dispatch("initContract");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
