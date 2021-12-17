<template>
  <div class="header flex row justify-between max-w-7xl mx-auto p-20">
    <Logo />
    <SearchBar class="flex-grow" />
    <UserStatus />
  </div>
  <div class="flex w-auto max-w-7xl mx-auto px-20">
    <div class="w-1/3 text-right px-10 border-r-2 mr-10 border-dashed">Left</div>
    <div class="w-2/3">
      <TitleList :titles="titles" />
    </div>
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
  loading = true;

  mounted(): void {
    this.getTitles();
  }

  async getTitles(): Promise<void> {
    const ens = this.$route.params.id;
    if (!ens) return;
    this.ens = (ens as string).replace(".eth", "");
    this.loading = true;
    this.titles = await this.$store.state.solApp.getTitles(this.ens);
    this.loading = false;
  }
}
</script>

<style scoped>
</style>
