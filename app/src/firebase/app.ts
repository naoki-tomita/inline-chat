import { initializeApp } from "firebase";

function random() {
  return Math.random().toString(32).substring(2);
}

function createSession() {
  const session = localStorage.getItem("session");
  if (session) return session
  localStorage.setItem("session", random())
  return localStorage.getItem("session")!;
}

export function resetSession() {
  localStorage.clear();
  window.location.reload();
}

export const session = createSession();
export const app = initializeApp({
  apiKey: "AIzaSyAuGDjdLiTHgLJq0KK4zRU3UnznXqDr_iY",
  authDomain: "inline-chat-1c4e4.firebaseapp.com",
  databaseURL: "https://inline-chat-1c4e4.firebaseio.com",
  projectId: "inline-chat-1c4e4",
  storageBucket: "inline-chat-1c4e4.appspot.com",
  messagingSenderId: "1067881588884",
  appId: "1:1067881588884:web:c6e839b77705d26f056c81",
  measurementId: "G-BP45CVGTYR"
});

export const collection = app.firestore().collection(session);
export function waitForResponse() {
  app.firestore()
    .collection("conversations")
    .where("session", "==", session)
    .get().then(it => {
      it.size === 0
        ? app.firestore()
            .collection("conversations")
            .add({ session, responseCompleted: true, completed: true })
        : it.docs[0].ref.update({ responseCompleted: false, completed: false })
    });
}

export async function setCompleted() {
  return new Promise(ok =>
    app.firestore().collection("conversations")
      .where("session", "==", session)
      .onSnapshot(e => e.docs[0].ref.update({ completed: true })
      .finally(ok))
  );
}
