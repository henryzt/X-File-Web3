<template>
  <Modal
    v-if="show"
    ref="modal"
    modalTitle="Add new Title"
    @closed="show = false"
  >
    <input
      class="border w-full h-12 px-3"
      placeholder="type your title here"
      v-model="content"
      id="domain"
      @keyup.enter="doSearch"
    />
    <div class="mt-5">
      Your title describes you, it can be anything you want, but it cannot be
      changed once minted. The more title you have, the more expensive a new
      title will be.
    </div>
    <div class="red-button inline-block mt-8 w-28 text-center float-right" @click="submitTitle">
      Submit
    </div>
  </Modal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Modal from "@/components/Modal.vue";

@Options({
  components: {
    Modal,
  },
  props: {},
})
export default class NewTitleModal extends Vue {
  show = false;
  content = "";
  open(): void {
    this.show = true;
  }

  async submitTitle(): Promise<void> {
    const ens = this.$store.state.ensName;
    if (this.content && ens) {
      const res = await this.$store.state.solApp?.addTitle(ens, this.content);
      console.warn(res);
    }
  }
}
</script>

<style scoped>
</style>
