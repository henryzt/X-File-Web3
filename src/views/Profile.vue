<template>
  <div class="header flex row justify-between p-20">
    <Logo />
    <SearchBar class="flex-grow" />
    <UserStatus />
  </div>
  <div>
    <div v-for="title in titles" :key="title">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchBar from "@/components/SearchBar.vue";
import Logo from "@/components/Logo.vue";
import UserStatus from "@/components/UserStatus.vue";

@Options({
  components: {
    SearchBar,
    Logo,
    UserStatus,
  },
  props: {},
  watch: {
    "$store.state.solApp"() {
      this.getTitles();
    },
    $route() {
      this.getTitles();
    }
  },
})
export default class Profile extends Vue {
  titles = [];
  ens = "";

  mounted(): void {
    this.getTitles();
  }

  async getTitles(): Promise<void> {
    const ens = this.$route.params.id;
    this.ens = (ens as string).replace(".eth", "");
    this.titles = await this.$store.state.solApp.getTitles(this.ens);
  }
}
</script>

<style scoped>
</style>
