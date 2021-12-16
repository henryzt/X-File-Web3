<template>
  <div class="header flex row justify-between">
    <Logo />
    <SearchBar />
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
})
export default class Profile extends Vue {
  titles = [];

  async mounted(): Promise<void> {
    let ens = this.$route.params.id;
    ens = (ens as string).replace(".eth", "");
    this.titles = await this.$store.state.solApp.getTitles(ens);
  }
}
</script>

<style scoped>
</style>
