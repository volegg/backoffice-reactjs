import { Alert } from "antd"

type ErrorComponentProps = {
  messages?: string[],
  onClose?: () => void;
}

export function ErrorComponent({ messages, onClose }: ErrorComponentProps) {
  return <>{messages && messages.length
    ? messages.map((message, i) => (<div style={{ marginBottom: "10px" }}>
      <Alert key={i} message={message} type="error" showIcon closable onClose={onClose} /></div>)) : null}
  </>
}