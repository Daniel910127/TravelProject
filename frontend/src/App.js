import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { BrowserRouter } from "react-router-dom";
import TravelRouter from "./router";
import React from 'react';
library.add(fas, far);

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <TravelRouter></TravelRouter>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
