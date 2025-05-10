import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";

interface WaitingRoomProps {
  joinChatRoom: (userName: string, chatRoom: string) => void;
}

const WaitingRoom = ({ joinChatRoom }: WaitingRoomProps) => {
  const [userName, setUserName] = useState("");
  const [chatRoom, setchatRoom] = useState("");

  const handleSubmit = async () => {
    console.log("Form values:");
    joinChatRoom(userName, chatRoom);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Row>
        <Col span={12} offset={6}>
          <Input
            onChange={(e) => setUserName(e.target.value)}
            placeholder="UserName (*)"
            className="h-10 rounded bg-gray-200"
          />

          <Input
            onChange={(e) => setchatRoom(e.target.value)}
            placeholder="ChatRoom (*)"
            className="h-10 rounded bg-gray-200"
          />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 bg-gray-800 hover:bg-black border-0 rounded font-bold"
            >
              GỬI YÊU CẦU
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default WaitingRoom;
