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
    <BrowserRouter>
      <SessionProvider >
        <React.StrictMode>
        <TravelRouter></TravelRouter>
    </React.StrictMode>
     </SessionProvider>
    </BrowserRouter>
     
    
  );
}

export default App;
