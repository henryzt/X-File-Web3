<template>
  <div class="header flex row justify-between p-20">
    <Logo />
    <SearchBar class="flex-grow" />
    <UserStatus />
  </div>
  <div>
    <TitleList :titles="titles" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchBar from "@/components/SearchBar.vue";
import Logo from "@/components/Logo.vue";
import UserStatus from "@/components/UserStatus.vue";
import TitleList from "@/components/TitleList.vue";

@Options({
  components: {
    SearchBar,
    Logo,
    UserStatus,
    TitleList,
  },
  props: {},
  watch: {
    "$store.state.solApp"() {
      this.getTitles();
    },
    $route() {
      this.getTitles();
    },
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
    if (!ens) return;
    this.ens = (ens as string).replace(".eth", "");
    this.titles = await this.$store.state.solApp.getTitles(this.ens);
  }
}
</script>

<style scoped>
</style>
