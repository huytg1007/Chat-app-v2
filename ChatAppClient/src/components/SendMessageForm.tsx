import { Form, Input, Button } from "antd";

interface SendMessageFormProps {
  sendMessage: (message: string) => void;
}

const SendMessageForm = ({ sendMessage }: SendMessageFormProps) => {
  const [form] = Form.useForm();

  const submitMessage = async ({ message }: { message: string }) => {
    sendMessage(message);
    form.resetFields(); // clear input
  };

  return (
    <Form form={form} onFinish={submitMessage}>
      <Form.Item
        name="message"
        rules={[{ required: true, message: "Please input your message!" }]}
      >
        <Input placeholder="Type your message here..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
        <Button
          htmlType="button"
          onClick={() => form.resetFields()}
          style={{ marginLeft: 8 }}
        >
          Clear
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SendMessageForm;
