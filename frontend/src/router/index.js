import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Redirect from "../Components/Redirect";
import Home from "../Views/Home";
import Login from "../Views/Login";
import NotFound from "../Views/NotFound";
import Profile from "../Views/Profile";
import Spot from "../Views/Spot";
import Register from "../Views/Register";
import Interest from "../Views/interest";
import SearchSpot from "../Views/SearchSpot";
import Itinerary from "../Components/Itinerary";
import MyItineraryList from "../Views/MyItineraryList";
import NewItinerary from "../Views/NewItinerary";

export default function TravelRouter() {
  return (
    <Routes>
      {/* <Route index element={<Film />} />   與父組件的/ 匹配    */}
      <Route path="/home" element={<Home />} />

      <Route path="/searchSpot" element={<SearchSpot />} />
      {/* <Route index element={<NowPlaying />} />  */}
      {/* <Route index element={<Redirect to="/film/nowplaying" />} />  */}
      {/* <Route path="/film/nowplaying" element={<NowPlaying />} />
        <Route path="comingsoon" element={<Comingsoon />} /> */}
      <Route path="/itinerary">
        <Route index element={<Itinerary />} />
        <Route path="/itinerary/create" element={<NewItinerary />} />
        <Route path="/itinerary/list" element={<MyItineraryList />} />
      </Route>

      <Route path="/spot/:s_Name" element={<Spot />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/interest" element={<Interest />} />
      {/* <Route path="*" element={<Navigate to="/film"/>} /> */}
      <Route path="/" element={<Redirect to="/home" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
