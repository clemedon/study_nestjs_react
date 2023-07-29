// 4. MESSAGE

// Messages component displays a list of messages passed to by App as 'messages' prop
export default function Messages({ messages }: { messages: string[] }) {
  // Return statement renders a div that contains a mapped array of messages,
  // creates a div with a unique key attribute for each displayed message
  return (
    <div>
      {messages.map((messages, index) => (
        <div key={index}>{messages}</div>
      ))}
    </div>
  );
}
