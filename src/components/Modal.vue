<template>
  <div class="overlay"></div>
  <div class="modal">
    <div class="font-display font-extrabold text-3xl text-mainGreen mb-12">Add new title</div>
    <div class="font-display font-extrabold text-3xl text-mainRed cursor-pointer absolute right-10 top-10">x</div>
    <input
        class="border w-full h-12 px-3"
        placeholder="type your title here"
        v-model="content"
        id="domain"
        @keyup.enter="doSearch"
      />
      <div class="mt-5">Your title describes you, it can be anything you want, but it cannot be changed once minted. The more title you have, the more expensive a new title will be.</div>
      <div class="red-button inline-block mt-8 w-28 text-center float-right">Next</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    
  },
})
export default class Modal extends Vue {
}
</script>

<style scoped>
</style>
