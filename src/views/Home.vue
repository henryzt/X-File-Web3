<template>
  <UserStatus class="fixed md:right-16 top-10 right-7" />
  <div class="home">
    <Logo class="my-10" :large="true" />
    <SearchBar />
    <div class="my-20 font-display font-medium green-underline">Go to my profile</div>
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
    UserStatus
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

.green-underline{
  text-decoration: underline;
  text-decoration-color: theme('colors.mainGreen');
  text-decoration-thickness: 2px;
  cursor: pointer;
}
</style>