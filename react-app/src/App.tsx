import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";

import { useState } from "react";

function App() {
  let cities: string[] = [
    "New York",
    "San Francisco",
    "Boston",
    "Los Angeles",
    "Chicago",
  ];

  const printSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      <ListGroup
        items={cities}
        heading="Cities"
        onSelectItem={printSelectItem}
      />
      {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>
          Alert: This is an alert
        </Alert>
      )}
      <Button color="primary" onClick={() => setAlertVisible(true)}>
        <strong>Toggle Alert</strong>
      </Button>
    </div>
  );
}

export default App;
