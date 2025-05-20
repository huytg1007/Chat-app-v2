import { Col, Row } from "antd";
import MessageContainer from "./MessageContainer";
import { Messages } from "@/interfaces/message";
import SendMessageForm from "./SendMessageForm";

interface ChatRoomMessages {
  messages: Messages[];
  sendMessage: (message: string) => void;
}

const ChatRoom = ({ messages, sendMessage }: ChatRoomMessages) => {
  return (
    <>
      <Row className="h-full flex justify-center items-center text-center bg-gray-300">
        <Col span={10} className="h-full">
          Chat Room
        </Col>
      </Row>

      <Row className="h-full bg-gray-300">
        <Col span={10} className="h-full">
          <MessageContainer messages={messages} />
        </Col>
        <Col span={10} className="h-full">
          <SendMessageForm sendMessage={sendMessage} />
        </Col>
      </Row>
    </>
  );
};

export default ChatRoom;
