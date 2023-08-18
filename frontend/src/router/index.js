import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Redirect from "../Components/Redirect";
import Home from "../Views/Home";
import Login from "../Views/Login";
import NotFound from "../Views/NotFound";
// import Profile from "../Views/Profile";
import Profile from "../Views/Profile2";
import Spot from "../Views/Spot";
import Register from "../Views/Register";
import Interest from "../Views/interest";
import Search from "../Views/Search";
import Itinerary from "../Components/Itinerary";
import MyItineraryList from "../Views/MyItineraryList";
import NewItinerary from "../Views/NewItinerary";
import MyInterest from "../Views/MyInterest";
import MyFavorite from "../Views/MyFavorite";
import AuthComponent from "./AuthComponent";

export default function TravelRouter() {
  return (
    <Routes>
      {/* <Route index element={<Film />} />   與父組件的/ 匹配    */}

      <Route
        path="/home"
        element={<AuthComponent component={<Home />}></AuthComponent>}
      />

      <Route path="/search">
        <Route index element={<Redirect to="/search/spot" />} />
        <Route path="/search/spot" element={<Search type={"spot"} />} />
        <Route path="/search/food" element={<Search type={"food"} />} />
        <Route path="/search/hotel" element={<Search type={"hotel"} />} />
      </Route>
      {/* <Route index element={<NowPlaying />} />  */}
      {/* <Route index element={<Redirect to="/film/nowplaying" />} />  */}
      {/* <Route path="/film/nowplaying" element={<NowPlaying />} />
        <Route path="comingsoon" element={<Comingsoon />} /> */}
      <Route path="/itinerary">
        <Route index element={<Itinerary />} />
        <Route path="/itinerary/create" element={<NewItinerary />} />
        <Route path="/itinerary/list" element={<MyItineraryList />} />
      </Route>

      <Route path="/attraction">
        <Route index element={<Redirect to="/search/spot" />} />
        <Route path="/attraction/spot/:id" element={<Spot type={"spot"} />} />
        <Route path="/attraction/food/:id" element={<Spot type={"food"} />} />
        <Route path="/attraction/hotel/:id" element={<Spot type={"hotel"} />} />
      </Route>

      <Route path="/spot/:s_Id" element={<Spot />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/profile" element={<Profile />}>
        <Route index element={<Redirect to="/profile/myItinerary" />} />
        <Route
          path="/profile/myItinerary"
          element={<MyItineraryList></MyItineraryList>}
        />
        <Route path="/profile/myFavorite" element={<MyFavorite />} />
        <Route path="/profile/myInterest" element={<MyInterest />} />
      </Route>

      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="/interest" element={<Interest />} />
      {/* <Route path="*" element={<Navigate to="/film"/>} /> */}
      <Route path="/" element={<Redirect to="/home" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
