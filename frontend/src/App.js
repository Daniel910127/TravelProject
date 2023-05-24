import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { BrowserRouter } from "react-router-dom";
import TravelRouter from "./router";
import { SessionProvider } from  "./contexts/SessionContext";
import React from 'react';
library.add(fas, far);

function App() {
  return (
     <SessionProvider >
        <React.StrictMode>
      <BrowserRouter>
        <TravelRouter></TravelRouter>
      </BrowserRouter>
    </React.StrictMode>
     </SessionProvider>
    
  );
}

export default App;
