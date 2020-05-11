<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title"></span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item
            v-for="conversation in conversations"
            :key="conversation.session"
            @click="openConversation(conversation.session)"
          >
            <md-icon>{{conversation.responseCompleted ? "done" : "textsms"}}</md-icon>
            <span class="md-list-item-text">{{ conversation.session }}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <Conversation v-if="session !== ''" :session="session" />
      </md-app-content>
    </md-app>

  </div>
</template>

<style lang="css" scoped>
.md-app {
  height: 100vh;
}
.md-drawer {
  width: 260px;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { app } from "./firebase/app";
import Conversation from "./components/Conversation.vue";

@Component({
  components: {
    Conversation
  }
})
export default class App extends Vue{
  menuVisible = false;
  conversations: { session: string, responseCompleted: boolean }[] = [];
  session: string = "";

  mounted() {
    app.firestore()
      .collection("conversations")
      .where("completed", "==", false).onSnapshot(it =>
        this.conversations = it.docs.map(it => it.data() as any)
      );
  }

  openConversation(conversation: string) {
    this.session = conversation;
    this.menuVisible = false;
  }
}
</script>
