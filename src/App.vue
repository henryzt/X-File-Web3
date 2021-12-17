<template>
  <router-view />
  <MetaMaskLoading />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MetaMaskLoading from "@/components/MetaMaskLoading.vue"

@Options({
  components: {
    MetaMaskLoading,
  },
})
export default class App extends Vue {
  async created(): Promise<void> {
    await this.$store.dispatch('initWeb3Account');
    await this.$store.dispatch('initContract');
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
