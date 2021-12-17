<template>
  <div class="header flex row justify-between max-w-7xl mx-auto p-20">
    <Logo />
    <SearchBar class="flex-grow" />
    <UserStatus />
  </div>
  <div class="flex w-auto max-w-7xl mx-auto px-20">
    <div class="w-1/3 text-right px-5 border-r-2 mr-10 border-dashed overflow-hidden overflow-ellipsis">
      <div class="font-display font-extrabold text-mainGreen text-3xl">{{ens}}.eth</div>
      <div class="leading-10">No collections yet</div>
      <div class="leading-5 text-xs">{{ address }}</div>
    </div>
    <div class="w-2/3">
      <div class="text-left text-3xl font-medium">Titles</div>
      <TitleList :titles="titles" />
      <div class="border bg-mainBg py-3 font-display text-lg animate-pulse" v-if="loading">Loading...</div>
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
      this.titles = [];
      this.address = "Loading Address";
      this.getTitles();
    },
  },
})
export default class Profile extends Vue {
  titles = [];
  ens = "";
  address = "Loading Address";
  loading = true;

  mounted(): void {
    this.getTitles();
  }

  async getTitles(): Promise<void> {
    const ens = this.$route.params.id;
    if (!ens) return;
    this.ens = (ens as string).toLowerCase().replace(".eth", "");
    this.loading = true;
    this.titles = await this.$store.state.solApp?.getTitles(this.ens);
    this.loading = false;
    this.address = await this.$store.state.ens?.name(this.ens + ".eth").getAddress()
  }
}
</script>

<style scoped>
</style>
