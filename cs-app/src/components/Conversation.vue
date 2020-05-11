<template>
  <div>
  <md-card v-for="message in messages" :key="message.time">
    <md-card-header>
      <div class="md-title">
        <md-avatar v-if="message.from === 'customer'">
          <md-icon>account_circle</md-icon>
        </md-avatar>
        {{ message.text }}
      </div>
      <div class="md-subhead">
        {{ message.from === "customer" ? "お客様" : "回答者" }} at {{formatDate(message.time)}}
      </div>
    </md-card-header>
  </md-card>
  <div style="display: flex; align-items: center;">
    <md-field style="margin-top: 20px">
      <label>返答する</label>
      <md-input
        v-model="message"
        @keypress.enter="reply"
      />
    </md-field>
    <md-button @click="reply">Reply</md-button>
  </div>
  </div>
</template>

<style lang="css" scoped>

</style>

<script lang="ts">
import Vue from 'vue'
import { app } from "../firebase/app";
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class Comversation extends Vue{
  menuVisible = false;
  messages: { text: string, from: "customer" | "company", time: number }[] = [];
  message: string = "";

  @Prop({ type: String, required: true, default: "" }) readonly session!: string;

  mounted() {
    this.subscribe();
  }

  updated() {
    this.subscribe();
  }

  unsubscribe?: () => void;
  subscribe() {
    this.unsubscribe && this.unsubscribe();
      this.unsubscribe = app.firestore()
        .collection(this.session).orderBy("time").onSnapshot(it =>
          (this.messages = it.docs.map(it => it.data() as any))
        );
  }

  destroy() {
    this.unsubscribe && this.unsubscribe();
  }

  formatDate(time: number) {
    const date = new Date(time);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }

  reply() {
    if (this.message) {
      app.firestore()
        .collection(this.session)
        .add({ text: this.message, from: "company", time: Date.now() }) ;
      app.firestore()
        .collection("conversations")
        .where("session", "==", this.session)
        .get().then(it => it.docs[0].ref.update({ responseCompleted: true }))
      this.message = "";
    }
  }
}
</script>
