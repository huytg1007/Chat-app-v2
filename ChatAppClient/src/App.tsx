import { useState } from "react";
import WaitingRoom from "./components/WaitingRoom";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

function App() {
  const [conn, setConnection] = useState<HubConnection | undefined>();

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5222/chat")
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("JoinSpecificChatRoom", (user: string, message: string) => {
      console.log("Received message:", user, message);
    });

    await connection.start();
    await connection.invoke("JoinSpecificChatRoom", {
      username: userName,
      chatRoom: chatRoom,
    });

    setConnection(connection);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full">
        <h1>Welcome to Mk ChatApp</h1>
        <WaitingRoom joinChatRoom={joinChatRoom} />
      </div>
    </div>
  );
}

export default App;
