import React from "react";
import { useState, createContext } from "react";

import { nanoid } from "nanoid";

import { useEffect } from "react";
import ItineraryHeader from "./Header";
import Days from "./Days";
import Plan from "./Plan";
import "./style.css";
import {
  Link,
  DirectLink,
  Element as ScrollElement,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import Map from "./Map";
import SearchSpot from "./SearchSpot";


const ItineraryContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  width: "100%",
  height: "calc(100vh - 0px)",
  background:'pink',
  overflowY: "scroll",
  overflowX: "hidden",
}));

const DaysWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  position: "relative",
  height: "100%",
  flex: 0,
  flexBasis: "50px",
  boxShadow: theme.shadows[6],
  // overflowY: "scroll",
  // overflowX: "hidden",
  // "::-webkit-scrollbar": {
  //   display: "none",
  // },
}));

const PlanWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  flex: 1,
  height: "100%",
  overflowY: "scroll",
  display: "flex",
  background:'white',
  /* '::-webkit-scrollbar':{
    display: 'none'
  } */  
}));

const PlanContainer = styled("div")(({ theme }) => ({
  height: "100%",
  minWidth: "0",
  maxWidth:'500px',
  flexGrow:1,
}));

const PlanHidden = styled("div")(({ theme }) => ({
  height: "100%",
  width: "calc(100% - 100px)",
  background:'yellow'
}));

const MapWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  
  height: "calc(100vh - 0px)",
  width: "500px",
  // top:0,
  // left:0,
  // right:0,
  // bottom:0,
}));
const ItineraryHeaderContainer = styled("div")(({ theme }) => {
  console.log(theme);
  return {};
});

const MapContainer = styled("div")(({ theme }) => ({
  height: "100%",
  width: "calc(100% - 0px)",
  position: "fixed",
  // backgroundColor: "green",
  // opacity:0.3,
}));

const TravelInfoStateContext = createContext({
  setTravelInfo: () => {},
  travelInfo: {},
  setDays: () => {},
  days: [],
  focusSpot: null,
  setFocusSpot: () => {},
});

function Itinerary() {
  const [travelInfo, setTravelInfo] = useState({
    t_Name: "",
    t_Description: "",
    t_StartDate: Date.now(),
    dayCount: 0,
    t_StartTime: {},
    travelList: [],
  });

  const [isDataInit, setIsDataInit] = useState();
  // const prevTravelInfo = usePrevious(travelInfo)
  const [days, setDays] = useState([]);

  const [focusSpot, setFocusSpot] = useState(null);

  useEffect(() => {
    setTravelInfo({
      t_Name: "台南三日遊",
      t_Description: "三天自由行",
      t_StartDate: "2023-05-18",
      dayCount: 4,
      t_StartTime: { 1: 28800, 2: 18800, 3: 28800, 4: 28800 },
      travelList: [
        {
          s_Id: 1,
          s_Name: "南鯤鯓代天府",
          s_Summary:
            "三川殿邀請藝師王武雄，以剪黏技法完成西拉雅族赤崁社、荷蘭、明清、日治四個時期的作品，讓廟口門面如同臺南歷史的縮影；走入廟內，牆面是府城潘氏家族三代的彩繪，名家汪崇楹書法、杜牧河父子泥塑神像，在前殿的屋頂還有對於府城近代發展有貢獻的人物剪黏。",
          location: { s_Latitude: 23.28647, s_Longitude: 120.14159 },
          s_Address: "727 臺南市北門區鯤江976號",
          tls_Day: 1,
          tl_Order: 1,
          tl_Id: 1,
          tl_TransportMode: 0, //0開車  1走路  2腳踏車
          tl_StayTime: 3600,
          tl_TransportTime: 1600,
          s_Picture: [
            {
              sp_Id: 1,
              sp_URL:
                "/media/images/spot/%E5%8D%97%E9%AF%A4%E9%AF%93%E4%BB%A3%E5%A4%A9%E5%BA%9C0.jpeg",
              s_Id: 1,
            },
            {
              sp_Id: 2,
              sp_URL:
                "/media/images/spot/%E5%8D%97%E9%AF%A4%E9%AF%93%E4%BB%A3%E5%A4%A9%E5%BA%9C1.jpeg",
              s_Id: 1,
            },
            {
              sp_Id: 3,
              sp_URL:
                "/media/images/spot/%E5%8D%97%E9%AF%A4%E9%AF%93%E4%BB%A3%E5%A4%A9%E5%BA%9C2.jpeg",
              s_Id: 1,
            },
          ],
          tl_Notes: "xxxxxxxxxxx",

          //tl_Score
        },
        {
          s_Id: 2,
          s_Name: "東隆宮文化中心",
          s_Summary:
            "三川殿邀請藝師王武雄，以剪黏技法完成西拉雅族赤崁社、荷蘭、明清、日治四個時期的作品，讓廟口門面如同臺南歷史的縮影；走入廟內，牆面是府城潘氏家族三代的彩繪，名家汪崇楹書法、杜牧河父子泥塑神像，在前殿的屋頂還有對於府城近代發展有貢獻的人物剪黏。",
          location: { s_Latitude: 23.23833, s_Longitude: 120.1118 },
          s_Address: "727 臺南市北門區三光里三寮灣127-3號",
          tls_Day: 1,
          tl_Order: 2,
          tl_Id: 2,
          tl_TransportMode: 1, //0開車  1走路  2腳踏車
          tl_StayTime: 3600,
          tl_TransportTime: 1600,
          s_Picture: [
            {
              sp_Id: 7,
              sp_URL:
                "/media/images/spot/%E9%A6%AC%E6%B2%99%E6%BA%9D%E6%B5%B7%E6%B4%8B%E4%BC%91%E9%96%92%E9%81%8B%E5%8B%95%E6%B8%A1%E5%81%87%E4%B8%AD%E5%BF%830.jpeg",
              s_Id: 3,
            },
            {
              sp_Id: 8,
              sp_URL:
                "/media/images/spot/%E9%A6%AC%E6%B2%99%E6%BA%9D%E6%B5%B7%E6%B4%8B%E4%BC%91%E9%96%92%E9%81%8B%E5%8B%95%E6%B8%A1%E5%81%87%E4%B8%AD%E5%BF%831.jpeg",
              s_Id: 3,
            },
            {
              sp_Id: 9,
              sp_URL:
                "/media/images/spot/%E9%A6%AC%E6%B2%99%E6%BA%9D%E6%B5%B7%E6%B4%8B%E4%BC%91%E9%96%92%E9%81%8B%E5%8B%95%E6%B8%A1%E5%81%87%E4%B8%AD%E5%BF%832.jpeg",
              s_Id: 3,
            },
          ],
          tl_Notes: "xxxxxxxxxxx",

          //tl_Score
        },
        {
          s_Id: 5,
          s_Name: "七股潟湖",
          s_Summary:
            "三川殿邀請藝師王武雄，以剪黏技法完成西拉雅族赤崁社、荷蘭、明清、日治四個時期的作品，讓廟口門面如同臺南歷史的縮影；走入廟內，牆面是府城潘氏家族三代的彩繪，名家汪崇楹書法、杜牧河父子泥塑神像，在前殿的屋頂還有對於府城近代發展有貢獻的人物剪黏。",
          location: { s_Latitude: 23.12359, s_Longitude: 120.07842 },
          s_Address: "724 臺南市七股區三股里",
          tls_Day: 2,
          tl_Order: 3,
          tl_Id: 3,
          tl_TransportMode: 0, //0開車  1走路  2腳踏車
          tl_StayTime: 3600,
          tl_TransportTime: 1600,
          s_Picture: [
            {
              sp_Id: 16,
              sp_URL:
                "/media/images/spot/%E4%B8%83%E8%82%A1%E9%B9%BD%E5%B1%B10.jpeg",
              s_Id: 6,
            },
            {
              sp_Id: 17,
              sp_URL:
                "/media/images/spot/%E4%B8%83%E8%82%A1%E9%B9%BD%E5%B1%B11.jpeg",
              s_Id: 6,
            },
            {
              sp_Id: 18,
              sp_URL:
                "/media/images/spot/%E4%B8%83%E8%82%A1%E9%B9%BD%E5%B1%B12.jpeg",
              s_Id: 6,
            },
          ],
          tl_Notes: "xxxxxxxxxxx",

          //tl_Score
        },
        {
          s_Id: 7,
          s_Name: "紅樹林賞鳥區",
          s_Summary:
            "三川殿邀請藝師王武雄，以剪黏技法完成西拉雅族赤崁社、荷蘭、明清、日治四個時期的作品，讓廟口門面如同臺南歷史的縮影；走入廟內，牆面是府城潘氏家族三代的彩繪，名家汪崇楹書法、杜牧河父子泥塑神像，在前殿的屋頂還有對於府城近代發展有貢獻的人物剪黏。",
          location: { s_Latitude: 23.07944, s_Longitude: 120.05405 },
          s_Address: "724 臺南市七股區鹽埕里52號",
          tls_Day: 2,
          tl_Order: 4,
          tl_Id: 4,
          tl_TransportMode: 0, //0開車  1走路  2腳踏車
          tl_StayTime: 3600,
          tl_TransportTime: 1600,
          s_Picture: [
            {
              sp_Id: 19,
              sp_URL:
                "/media/images/spot/%E7%B4%85%E6%A8%B9%E6%9E%97%E8%B3%9E%E9%B3%A5%E5%8D%800.jpeg",
              s_Id: 7,
            },
            {
              sp_Id: 20,
              sp_URL:
                "/media/images/spot/%E7%B4%85%E6%A8%B9%E6%9E%97%E8%B3%9E%E9%B3%A5%E5%8D%801.jpeg",
              s_Id: 7,
            },
            {
              sp_Id: 21,
              sp_URL:
                "/media/images/spot/%E7%B4%85%E6%A8%B9%E6%9E%97%E8%B3%9E%E9%B3%A5%E5%8D%802.jpeg",
              s_Id: 7,
            },
          ],
          tl_Notes: "xxxxxxxxxxx",

          //tl_Score
        },
        {
          s_Id: 11,
          s_Name: "頑皮世界野生動物園 ",

          s_Summary:
            "三川殿邀請藝師王武雄，以剪黏技法完成西拉雅族赤崁社、荷蘭、明清、日治四個時期的作品，讓廟口門面如同臺南歷史的縮影；走入廟內，牆面是府城潘氏家族三代的彩繪，名家汪崇楹書法、杜牧河父子泥塑神像，在前殿的屋頂還有對於府城近代發展有貢獻的人物剪黏。",
          location: { s_Latitude: 23.2809, s_Longitude: 120.20947 },
          s_Address: "726 臺南市學甲區頂州里75-25號",
          tls_Day: 3,
          tl_Order: 6,
          tl_Id: 6,
          tl_TransportMode: 0, //0開車  1走路  2腳踏車
          tl_StayTime: 3600,
          tl_TransportTime: 1600,
          s_Picture: [
            {
              sp_Id: 34,
              sp_URL:
                "/media/images/spot/%E6%B5%B7%E5%9F%94%E6%B1%A0%E7%8E%8B%E5%BA%9C0.jpeg",
              s_Id: 12,
            },
            {
              sp_Id: 35,
              sp_URL:
                "/media/images/spot/%E6%B5%B7%E5%9F%94%E6%B1%A0%E7%8E%8B%E5%BA%9C1.jpeg",
              s_Id: 12,
            },
            {
              sp_Id: 36,
              sp_URL:
                "/media/images/spot/%E6%B5%B7%E5%9F%94%E6%B1%A0%E7%8E%8B%E5%BA%9C2.jpeg",
              s_Id: 12,
            },
          ],
          tl_Notes: "xxxxxxxxxxx",

          //tl_Score
        },
        {
          s_Id: 13,
          s_Name: "麻豆代天府",
          s_Summary:
            "三川殿邀請藝師王武雄，以剪黏技法完成西拉雅族赤崁社、荷蘭、明清、日治四個時期的作品，讓廟口門面如同臺南歷史的縮影；走入廟內，牆面是府城潘氏家族三代的彩繪，名家汪崇楹書法、杜牧河父子泥塑神像，在前殿的屋頂還有對於府城近代發展有貢獻的人物剪黏。",
          location: { s_Latitude: 23.19034, s_Longitude: 120.26109 },
          s_Address: "721 臺南市麻豆區南勢里關帝廟60號",
          tls_Day: 3,
          tl_Order: 7,
          tl_Id: 7,
          tl_TransportMode: 0, //0開車  1走路  2腳踏車
          tl_StayTime: 3600,
          tl_TransportTime: 1600,
          s_Picture: [
            {
              sp_Id: 37,
              sp_URL:
                "/media/images/spot/%E9%BA%BB%E8%B1%86%E4%BB%A3%E5%A4%A9%E5%BA%9C0.jpeg",
              s_Id: 13,
            },
            {
              sp_Id: 38,
              sp_URL:
                "/media/images/spot/%E9%BA%BB%E8%B1%86%E4%BB%A3%E5%A4%A9%E5%BA%9C1.jpeg",
              s_Id: 13,
            },
            {
              sp_Id: 39,
              sp_URL:
                "/media/images/spot/%E9%BA%BB%E8%B1%86%E4%BB%A3%E5%A4%A9%E5%BA%9C2.jpeg",
              s_Id: 13,
            },
          ],
          tl_Notes: "xxxxxxxxxxx",

          //tl_Score
        },
      ],
    });

    setIsDataInit(true);
  }, []);

  const { travelList, dayCount, startTime, t_StartDate } = travelInfo;

  // console.log(travelList, 8888);

  useEffect(() => {
    const startDate = new Date(t_StartDate);
    // console.log(currentDate.getDate() + 1)
    const updatedDays = [];
    startDate.setDate(startDate.getDate() - 1);
    for (let i = 1; i <= dayCount; i++) {
      startDate.setDate(startDate.getDate() + 1);
      updatedDays.push(`${startDate.getMonth() + 1}/${startDate.getDate()}`);
    }

    setDays(updatedDays);
  }, [t_StartDate, dayCount]);

  // console.log(focusSpot, "@@@@");

  return (
    isDataInit && (
      <TravelInfoStateContext.Provider
        value={{
          travelInfo,
          setTravelInfo,
          days,
          setDays,
          focusSpot,
          setFocusSpot,
        }}
      >
        <ItineraryContainer  >
          <DaysWrapper>
            <Days></Days>
          </DaysWrapper>
          <PlanWrapper id="scroll-container">
            <PlanContainer>
              <ItineraryHeaderContainer>
                <ItineraryHeader />
              </ItineraryHeaderContainer>
              <Plan></Plan>
            </PlanContainer>

            <PlanHidden></PlanHidden>
          </PlanWrapper>

          <MapWrapper>
            <MapContainer>
              {/* <Map></Map> */}
            </MapContainer>
          </MapWrapper>
        </ItineraryContainer>
      </TravelInfoStateContext.Provider>
    )
  );
}
export { TravelInfoStateContext };
export default Itinerary;
