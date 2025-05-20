import { Messages } from "@/interfaces/message";

interface MessageContainerProps {
  messages: Messages[];
}

const MessageContainer = ({ messages }: MessageContainerProps) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} className="message">
          <strong>{message.userName}: </strong>
          {message.message}
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
