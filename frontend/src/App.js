import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import TravelRouter from "./router";
import { SessionProvider } from "./contexts/SessionContext";
import React from "react";
import NavBar from "./Components/NavBar";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
const NavBarOffset = styled("div")(({ theme }) => ({
  paddingTop: "64px",
}));
library.add(fas, far);
function App(props) {
  const { pathname } = useLocation();
  const excludeNavRoutes = ["/itinerary"];
  // console.log(pathname);
  return (
    <SessionProvider>
      {!excludeNavRoutes.includes(pathname) && <NavBar />}
      {!excludeNavRoutes.includes(pathname) && (
        <NavBarOffset>
          <TravelRouter></TravelRouter>
        </NavBarOffset>
      )}

      {excludeNavRoutes.includes(pathname) && (
        <TravelRouter></TravelRouter>
      )}
    </SessionProvider>
  );
}

export default App;
