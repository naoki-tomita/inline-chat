import React, { useEffect, useState } from 'react';
import { Header } from "./components/Headers";
import { MessegeInput } from "./components/MessageInput";
import { Messages } from "./components/Messages";
import Container from '@material-ui/core/Container';
import { collection } from "./firebase/app";

function App() {
  const [state, setState] = useState<{ text: string, from: "customer" | "company" }[]>([]);
  useEffect(() => {
    collection.orderBy("time").onSnapshot((snampshot) => {
      const result = snampshot.docs.map(it => it.data());
      setState(result as any)
    });
  }, []);
  return (
    <>
    <Header />
    <Container style={{ marginBottom: 64, marginTop: 64 }}>
    <Messages
      messages={[{
        from: "company",
        text: "何かお困りですか？"
      }, ...state]}
    />
    </Container>
    <MessegeInput />
    </>
  );
}

export default App;
