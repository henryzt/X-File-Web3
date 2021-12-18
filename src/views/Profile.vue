<template>
  <div class="header flex row justify-between max-w-7xl mx-auto p-20">
    <Logo />
    <SearchBar class="flex-grow" />
    <UserStatus />
  </div>
  <div class="flex w-auto max-w-7xl mx-auto px-20">
    <div
      class="
        w-1/3
        text-right
        px-5
        border-r-2
        mr-10
        border-dashed
        overflow-hidden overflow-ellipsis
      "
    >
      <div v-if="profile">
        <img
          class="icon"
          :src="'/img/lvs/lv' + profile.duration_level + '.jpeg'"
        />
      </div>
      <!-- domain -->
      <div class="font-display font-extrabold text-mainGreen text-3xl">
        {{ ens }}.eth
      </div>
      <!-- collections -->
      <div v-if="profile" class="my-5">
        <span>Activity Level - </span>
        <img
          class="icon"
          :src="'/img/lvs/ac' + profile.active_level + '.jpeg'"
        />
        <div>Account Value - {{ profile.tx_sum.toFixed(2) }} ETH</div>
        <div>Transaction Count - {{ profile.tx_count }}</div>
      </div>
      <div v-else class="leading-10">No collections yet</div>
      <div class="leading-5 text-xs">{{ address }}</div>
    </div>
    <div class="w-2/3">
      <!-- welcome notice -->
      <div v-if="isOwner" class="border grid grid-cols-8 p-5 mb-10">
        <div class="text-5xl pt-2">👋</div>
        <div class="col-span-7 font-display text-2xl text-left">
          <div class="font-extrabold">Hello, {{ ens }}</div>
          <div class="text-lg">This is your ether profile page</div>
        </div>
      </div>
      <!-- title list -->
      <div class="text-left text-3xl font-medium">Titles</div>
      <TitleList :titles="titles" :isOwner="isOwner && !loading" />
      <!-- title loading -->
      <div
        class="border bg-mainBg py-3 font-display text-lg"
        v-if="!titles?.length"
      >
        <span class="animate-pulse" v-if="loading">Loading...</span>
        <span v-else>No titles found for this domain</span>
      </div>
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
      this.load();
    },
    $route() {
      this.profile = null;
      this.titles = [];
      this.address = "Loading Address...";
      this.load();
    },
  },
})
export default class Profile extends Vue {
  titles = [];
  ens = "";
  address = "Loading Address...";
  loading = true;
  profile = null;

  mounted(): void {
    this.load();
  }

  load(): void {
    this.getTitles();
    this.getProfile();
  }

  get isOwner(): boolean {
    return this.$store.state.ensName === this.ens + ".eth";
  }

  async getTitles(): Promise<void> {
    const ens = this.$route.params.id;
    if (!ens) return;
    this.ens = (ens as string).toLowerCase().replace(".eth", "");
    this.loading = true;
    this.titles = await this.$store.state.solApp?.getTitles(this.ens);
    this.loading = false;
    this.address = await this.$store.state.ens
      ?.name(this.ens + ".eth")
      .getAddress();
    if (this.address == "0x0000000000000000000000000000000000000000") {
      this.address = "Account not found";
    }
  }

  async getProfile(): Promise<void> {
    const res = await fetch(
      `https://cors-where.herokuapp.com/http://43.130.232.102:8080/q?ens=${this.ens}.eth`
    );
    const profile = await res.json();
    console.log(profile);
    if (profile?.status === 0) {
      this.profile = profile.data;
    }
  }
}
</script>

<style scoped>
.icon {
  max-width: 30px;
  display: inline;
}
</style>
