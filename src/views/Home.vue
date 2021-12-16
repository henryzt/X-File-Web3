<template>
  <div class="home">
    <SearchBar />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchBar from "@/components/SearchBar.vue"; // @ is an alias to /src

@Options({
  components: {
    SearchBar,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background: #fbf8f3;
  @apply flex flex-col justify-center;
}
</style>