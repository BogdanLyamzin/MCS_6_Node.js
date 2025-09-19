import { useState, useCallback } from "react";
import {nanoid} from "nanoid";
import io from "socket.io-client";

import SigninChatForm from "./components/SigninChatForm/SigninChatForm";
import ChatForm from "./components/ChatForm/ChatForm";
import Chat from "./components/Chat/Chat";

function App() {
  const [nickname, setNickname] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [socket, setSocket] = useState(null);

  const addNickname = useCallback(({nickname})=> {
    const socket = io.connect("http://localhost:5000");
    setSocket(socket);
    setNickname(nickname);
    socket.on("chat-message", data=> {
      const {message, nickname} = JSON.parse(data);
      setMessageList(prevList => {
        const newMessage = {
          id: nanoid(),
          type: "user",
          nickname,
          message
        };
        return [...prevList, newMessage]
      });
    })
  }, []);

  const addMessage = useCallback(({message})=> {
    setMessageList(prevList => {
      const newMessage = {
        id: nanoid(),
        type: "you",
        nickname,
        message
      };
      return [...prevList, newMessage]
    });
    socket.emit("chat-message", JSON.stringify({nickname, message}));
  }, [nickname, socket]);

  const closeChat = useCallback(()=> {
    socket.disconnect(true);
    setSocket(null);
  }, [socket]);
  
  return (
    <div className="App">
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat items={messageList}  />}
      {(nickname && socket) && <button onClick={closeChat} type="button">Close chat</button>}
    </div>
  )
}

export default App;
