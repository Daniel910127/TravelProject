import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import { produce } from "immer";
import SpotLittleCard from "../SpotLittleCard";
import Typography from "@mui/material/Typography";
export default function ProfileFavorite() {
  // const [hotPlace, setHotPlace] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/hot-place?_limit=10&_page=1")
  //     .then((response) => {
  //       setHotPlace(response.data);
  //     });
  // }, []);

  // return <div>HotPlace2</div>

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setItems([
      {
        s_Id: 1,
        s_picture: [
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
        s_Lang: "zh-tw",
        s_Name: "南鯤鯓代天府",
        s_Summary:
          "是一座位於臺南市北門區之王爺廟，為台灣五府千歲的王爺總廟，主祀「代天巡狩」李、池、吳、朱、范 府千歲五府千歲",
        s_Introduction:
          "是一座位於臺南市北門區之王爺廟，為台灣五府千歲的王爺總廟，主祀「代天巡狩」李、池、吳、朱、范 府千歲五府千歲",
        s_OpenTime:
          "主殿-06:00~21:00、大鯤園-08:00~17:00、凌霄寶殿-07:30~17:00(全年無休)",
        s_District: "北門區",
        s_Address: "727 臺南市北門區鯤江976號",
        s_Tel: "+886-6-7863711",
        s_Fax: "",
        s_Latitude: 23.28647,
        s_Longitude: 120.14159,
        s_Services: "",
        s_Category: "歷史古蹟,宗教廟宇,在地藝文,無障礙設施",
        s_UpdateTime: "2022-12-05 15:58:16",
        s_Stars: 4.6,
        s_Reviews: 10356,
        s_Likes: null,
        s_IsLike: true,
      },
      {
        s_Id: 2,
        s_picture: [
          {
            sp_Id: 4,
            sp_URL:
              "/media/images/spot/%E6%9D%B1%E9%9A%86%E5%AE%AE%E6%96%87%E5%8C%96%E4%B8%AD%E5%BF%830.jpeg",
            s_Id: 2,
          },
          {
            sp_Id: 5,
            sp_URL:
              "/media/images/spot/%E6%9D%B1%E9%9A%86%E5%AE%AE%E6%96%87%E5%8C%96%E4%B8%AD%E5%BF%831.jpeg",
            s_Id: 2,
          },
          {
            sp_Id: 6,
            sp_URL:
              "/media/images/spot/%E6%9D%B1%E9%9A%86%E5%AE%AE%E6%96%87%E5%8C%96%E4%B8%AD%E5%BF%832.jpeg",
            s_Id: 2,
          },
        ],
        s_Lang: "zh-tw",
        s_Name: "東隆宮文化中心",
        s_Summary: "",
        s_Introduction:
          "來到北門區三寮灣，不管從哪個方向，遠遠的都可以看到七樓高的「東隆宮文化中心」，在小漁村內顯得格外華麗，如果喜歡看迎神賽會，熱愛祭典的氣氛，來到此處一定會非常開心。\r\n\r\n中心內設有：王爺信仰文物館、宗教文物展示館、水滸英雄館、民間信仰研究館、禮俗文物館等，館藏非常豐富。3樓的王爺信仰文物館，是台灣唯一的王爺信仰主題館，以王爺信仰及刈香醮典為特色，以照片圖像、祭典的實物與精緻的木雕呈現，將王爺信仰文化介紹的巨細靡遺；如事先預約參觀導覽，能更深入了解鹽分地帶王爺信仰的習俗。此外，禮俗文物館及水滸英雄館，也都很有可看性，尤其水滸英雄館內的作品是禮聘舉世聞名之廣東石灣陶藝廠，耗時三年始製作完成梁山泊108條好漢塑像，為全台唯一全套梁山人馬的石灣陶塑像，非常難得一見。&nbsp;逛完後，不彷到鄰近的蘆竹溝欣賞北門潟湖的美麗的夕陽，為旅程畫下美麗的句點。",
        s_OpenTime: "08:30~11:30 12:30~16:30，全年開放",
        s_District: "北門區",
        s_Address: "727 臺南市北門區三光里三寮灣127-3號",
        s_Tel: "+886-6-7850355",
        s_Fax: "+886-6-7850356",
        s_Latitude: 23.23833,
        s_Longitude: 120.1118,
        s_Services: "",
        s_Category: "地方展館,在地藝文",
        s_UpdateTime: "2022-12-05 16:04:52",
        s_Stars: 4.4,
        s_Reviews: 53,
        s_Likes: null,
        s_IsLike: true,
      },
      {
        s_Id: 3,
        s_picture: [
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
        s_Lang: "zh-tw",
        s_Name: "馬沙溝海洋休閒運動渡假中心",
        s_Summary: "  ",
        s_Introduction:
          "沙灘戲水區開放到18:00\r\n\r\n約莫在1980年代可說是馬沙溝最輝煌的時期，夏天的海邊總是人山人海，攤販、陽傘、水上活動琳瑯滿目，人潮洶湧程度可媲美現在的墾丁，每當夕陽西下，沙灘與海水呈現金黃連成一片，如鏡面倒映晚霞的沙灘與海水，是此處最迷人的時刻，後來因為場域建築老舊改建，熱鬧的沙灘沉寂了一陣子，但現在新穎的遊客中心加上設備完善的烤肉區、游泳區、露營區、親子遊戲區、沙灘排球場、水上摩托車、兒童滑水道、觀海亭等琳瑯滿目的遊憩設施，又讓馬沙溝海洋休閒運動渡假中心恢復了往日榮景，且海灘上有救生員不時巡視著海面的安全狀況，讓原本就很適合玩水的海灘玩起來更是安全感十足，每年夏天固定舉辦的沙雕活動與熱力十足的夏日音樂祭，讓馬沙溝真的不輸給墾丁的春吶般熱鬧。\r\n\r\n最新資訊請查閱官網及粉專",
        s_OpenTime:
          "星期日 10:00–22:00\r\n星期一 休 息\r\n星期二 休 息\r\n星期三 10:00–22:00\r\n星期四 10:00–22:00\r\n星期五 10:00–22:00\r\n星期六 10:00–22:00",
        s_District: "將軍區",
        s_Address: "725 臺南市將軍區平沙里140號",
        s_Tel: "+886-6-7931580",
        s_Fax: "+886-6-7930805",
        s_Latitude: 23.21748,
        s_Longitude: 120.08395,
        s_Services: "",
        s_Category: "戶外運動,休閒農漁",
        s_UpdateTime: "2022-12-05 16:14:37",
        s_Stars: 5,
        s_Reviews: 1,
        s_Likes: null,
        s_IsLike: true,
      },
    ]);
  }, []);

  let init = false;

  const onDislikeClick = (s_Id) => {
    //ajax update data
    const nextState = produce(items, (draftState) => {
      const index = draftState.findIndex((item) => item.s_Id === s_Id);

      if (index !== -1) {
        draftState.splice(index, 1);
      }
    });

    // console.log(nextState);
    setItems(nextState);
  };

  /* useEffect(() => {
    if (init) return;
    if (loading) return;
    setLoading(true);
    console.log(pageNumber);
    //http://localhost:3000/hot-place?_limit=10&_page=${pageNumber}
    fetch(`http://127.0.0.1:8000/api/high_rating_spots/`)
      .then((response) => response.json())
      .then((data) => {
        setItems((prevItems) => [...prevItems, ...data]);
        setLoading(false);
      });
    return () => {
      init = true;
    };
  }, [pageNumber]); */

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 12, md: 16 }}
        alignItems="stretch"
        justifyContent={'center'}

      >
        {items.map((item) => (
          <Grid
            key={item.s_Id}
            xs={2}
            sm={4}
            md={4}
            display={"flex"}
            
            justifyContent={"center"}
            flexGrow={1}
          >
            <SpotLittleCard
              Id={item.s_Id}
              Name={item.s_Name}
              Pictures={item.s_picture}
              District={item.s_District}
              isLike={item.s_IsLike}
              onLikeClick={onDislikeClick}
            ></SpotLittleCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
