<template>
  <transition name="fade">
    <Modal
      v-if="show"
      ref="modal"
      modalTitle="Add a new title"
      @closed="show = false"
    >
      <input
        class="border w-full h-12 px-3"
        placeholder="type your title here"
        v-model="content"
        id="ens_title"
        @keyup.enter="doSearch"
      />
      <div class="mt-5">
        Your title describes you, it can be anything you want, but it cannot be
        changed once minted. The more title you have, the more expensive a new
        title will be.
      </div>
      <div
        class="red-button mt-8 w-40 text-center mx-auto"
        :class="[content ? '' : 'opacity-50']"
        @click="submitTitle"
      >
        Submit
      </div>
    </Modal>
  </transition>
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
    const ens = this.$store.state.ensName?.replace(".eth", "");
    if (this.content && ens) {
      this.show = false;
      this.$store.commit("setMetaLoading", true);
      try {
        const res = await this.$store.state.solApp?.addTitle(
          ens,
          this.content,
          {
            from: this.$store.state.account,
          }
        );
        console.warn(res);
        this.content = "";
        window.location.reload();
      } catch (err) {
        this.show = true;
        console.error(err);
      }
      this.$store.commit("setMetaLoading", false);
    }
  }
}
</script>

<style scoped>
</style>
