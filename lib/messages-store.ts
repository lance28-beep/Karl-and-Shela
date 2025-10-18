interface StoredMessage {
  id: string
  name: string
  message: string
  timestamp: string
}

const messagesStore: StoredMessage[] = []

export function addMessage(name: string, message: string): StoredMessage {
  const newMessage: StoredMessage = {
    id: Date.now().toString(),
    name,
    message,
    timestamp: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }
  messagesStore.unshift(newMessage)
  return newMessage
}

export function getMessages(): StoredMessage[] {
  return messagesStore
}
