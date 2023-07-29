// 3. MESSAGEINPUT

import { useState } from "react";

// MessageInput component takes a 'send' prop and handles user input
export default function MessagesInput({
  send,
}: {
  send: (val: string) => void;
}) {
  // Defines 'value' state variable and 'setValue' function to update
  // it. Initialize value as an empty string.
  const [value, setValue] = useState(""); // State to track the input value

  return (
    <>
      {/*Render an input field with a value is set to 'value' state, the
      onChange event updates the value state whenever the user type in the
      input field.*/}
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message..."
        value={value}
      />
      {/*Renders a button with a "Send" label which calls the 'send' function
      when clicked, passing current 'value' state as an argument.*/}
      <button onClick={() => send(value)}>Send</button>
    </>
  );
}
