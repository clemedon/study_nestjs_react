// 2. App.tsx

// Hooks are functions that allow functional components to have their own
// 'state', manage side 'effects' and use 'context'. useState, useEffect and
// useContext are React built-in hooks. They are always prefixed with 'use'.

import { useEffect, useState } from "react"; // react hooks
import "./App.css";
import io, { Socket } from "socket.io-client"; // socket.io enable client-server communication over websockets
import MessageInput from "./MessageInput";
import Messages from "./Messages";

// A component can be a function or class. Functional components have a simpler
// syntax, are easier to read and test, and can make use of hooks to have a
// state, side effects and context.

// Main app components
function App() {
  // Define 'socket' an undefined variable and setSocket a function to update its value
  // Define 'messages' an empty array and setMessages a function to update its value
  const [socket, setSocket] = useState<Socket>(); // state for managing socket connection
  const [messages, setMessages] = useState<string[]>([]); // state for storing messages

  // Send messages using socket connection
  const send = (value: string) => {
    socket?.emit("message", value); // emit 'message' event via socket object
    // Optional chaining (socket?.) make sure socket is not NULL or undefined
  };

  // 'useEffect' takes 2 arguments, a function that contains the side effect
  // logic, and an optional array of dependencies, if provided the effect will
  // run only when a dependency changes. Otherwise run once when component
  // mounts. Here the effect will run only once, when 'setSocket' changes
  // during the component's initial rendering (mounts).
  //
  // A "component mounts" when it is being added to the DOM, where it is
  // rendered for the first time, leading to side effects like DOM
  // modifications.
  //
  // "Component rendering" refers to the process of creating the virtual DOM
  // elements and rendering them in the actual DOM. When a component is
  // rendered, React creates a representation of the component's current state
  // and props as virtual DOM elements. It then compares the virtual DOM with
  // the actual DOM to find the minimal set of changes required to update the
  // UI. Finally it applies these changes to the actual DOM resulting in an
  // updated UI.

  // useEffect hook to create the socket connection when the component mounts
  useEffect(() => {
    const newSocket = io("http://localhost:8001"); // establishes new socket connection
    setSocket(newSocket); // update 'socket' state
  }, [setSocket]);

  // Called whenever a 'message' event is received from the server gateway (cf. backend)
  const messageListener = (message: string) => {
    setMessages([...messages, message]); // Update 'messages' state with the new message
  };

  // This effect sets up a listener for the 'message' event on the socket
  // object using the 'on' method when the component mounts. When a 'message'
  // event is received (triggered when the MessageInput is clicked), the
  // 'messageListener' function is called, updating the messages state.
  //
  // The effect also returns a cleanup function that removes the event listener
  // from the socket object using the 'off' method when the component unmounts.
  //
  // The 'cleanup function' is a function that will be executed when the
  // component is about to unmount.  It is used to clean up any resources or
  // subscriptions created during the effect's execution. Here the cleanup
  // function removes the event listener that was set up earlier with:
  // socket.on("message", messageListener)
  useEffect(() => {
    socket?.on("message", messageListener); // Set up the event listener for the 'message' event on the socket object
    return () => {
      socket?.off("message", messageListener); // Clean up the event listener when the component unmounts
    };
  });

  // The return statement renders two components wrapped in a fragment <>
  //
  // A "fragment" is a JSX way to group multiple elements together without the
  // use of additional parent element.  Useful to return multiple elements from
  // a components's render function without the need of <div>.
  return (
    <>
      {" "}
      {/* Renders MessageInput component with 'send' function prop. */}
      <MessageInput send={send} />
      {/* Renders the Messages component with 'messages' state prop. */}
      <Messages messages={messages} />
    </>
  );
}

// a "prop" (short for properties) is a mechanism for passing data from a
// parent component to a child component.  It allow to customize a child based
// on the data provided by their parents. Props are READONLY.

export default App;
