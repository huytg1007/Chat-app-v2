import { useState } from "react";
import WaitingRoom from "./components/WaitingRoom";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Messages } from "./interfaces/message";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [conn, setConnection] = useState<HubConnection | undefined>();
  const [messages, setMessages] = useState<Messages[]>([]);

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5222/chat")
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceiveMessage", (message: string) => {
      console.log("Received message:", message);
    });

    connection.on(
      "ReceiveSpecificMessage",
      (userName: string, message: string) => {
        setMessages((prevMessages) => [...prevMessages, { userName, message }]);
      }
    );

    await connection.start();
    await connection.invoke("JoinSpecificChatRoom", {
      username: userName,
      chatRoom: chatRoom,
    });

    setConnection(connection);
  };

  const sendMessage = async (message: string) => {
    if (conn) {
      console.log("Sending message:", message);
      await conn.invoke("SendMessage", message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full">
        <h1>Welcome to Mk ChatApp</h1>
        {!conn ? (
          <WaitingRoom joinChatRoom={joinChatRoom} />
        ) : (
          <ChatRoom messages={messages} sendMessage={sendMessage} />
        )}
      </div>
    </div>
  );
}

export default App;
