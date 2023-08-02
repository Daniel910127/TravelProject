import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InterestsIcon from "@mui/icons-material/Interests";
import { styled } from "@mui/material/styles";
import { purple, grey } from "@mui/material/colors";
import { Box } from "@mui/material";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
} from "react-router-dom";
import { Outlet } from "react-router-dom";

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    console.log(possibleMatch);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const MyTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: '1.25rem',
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const MyTab = styled(Tab)(({ theme }) => ({
  color: grey[600],
  marginRight: ".2rem",
  borderRadius: "4px",
  minHeight: 0,
  "&.Mui-selected": {
    backgroundColor: purple[600],
    color: "white",
  },
}));

/* function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
} */

const TabsWrapper = styled(Box)(({ theme }) => ({
  padding: "0 1.25rem 1.25rem 1.25rem",
}));

/* function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
} */

function ProfileTab() {
  /* const [value, setValue] = React.useState(0);
   */
  const routeMatch = useRouteMatch([
    "/profile/myItinerary",
    "/profile/myFavorite",
    "/profile/myInterest",
  ]);
  const currentTab = routeMatch?.pattern?.path;
  console.log(currentTab);
  /* const handleChange = (event, newValue) => {
    setValue(newValue);
  }; */

  return (
    <TabsWrapper>
      <MyTabs value={currentTab ? currentTab : "/profile/myItinerary"}>
        <MyTab
          label="我的行程"
          value={"/profile/myItinerary"}
          to="/profile/myItinerary"
          component={Link}
          icon={<EventNoteIcon />}
          iconPosition="start"
        />
        <MyTab
          label="我的收藏"
          value={"/profile/myFavorite"}
          to="/profile/myFavorite"
          component={Link}
          icon={<FavoriteIcon />}
          iconPosition="start"
        />
        <MyTab
          label="興趣表"
          value={"/profile/myInterest"}
          to="/profile/myInterest"
          component={Link}
          icon={<InterestsIcon />}
          iconPosition="start"
        />
      </MyTabs>

      <Outlet></Outlet>
    </TabsWrapper>
  );
}

export default ProfileTab;
