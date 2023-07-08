import React from "react";

import { useState, useEffect, createContext } from "react";

const ItineraryListContext = createContext();

export function ItineraryListProvider({ children }) {
  const [itineraryList, setItineraryList] = useState(null);

  useEffect(() => {
    setItineraryList([
      {
        t_Id: 1,
        startTime: {
          1: 3600,
        },
        account: {
          account: "daniel",
          password:
            "pbkdf2_sha256$390000$nP7wAsPsi4dtdR2qvicuJD$i6pfpJnalFAEKvEoouKc5rCTNPbWnOMNDf2ra9FDzN4=",
          username: "daniel",
          email: "daniel@gmail.com",
          rank: 999,
        },
        travel_list_detail: [
          {
            tl_Id: 4,
            other_info: {
              s_Id: 188,
              s_picture: [
                {
                  sp_Id: 1615,
                  sp_URL:
                    "/media/images/spot/%E8%87%BA%E7%81%A3%E5%9F%8E%E6%AE%98%E8%B9%9F(%E5%AE%89%E5%B9%B3%E5%8F%A4%E5%A0%A1%E5%85%A7%E7%89%86)0.jpeg",
                  s_Id: 188,
                },
                {
                  sp_Id: 1616,
                  sp_URL:
                    "/media/images/spot/%E8%87%BA%E7%81%A3%E5%9F%8E%E6%AE%98%E8%B9%9F(%E5%AE%89%E5%B9%B3%E5%8F%A4%E5%A0%A1%E5%85%A7%E7%89%86)1.jpeg",
                  s_Id: 188,
                },
                {
                  sp_Id: 1617,
                  sp_URL:
                    "/media/images/spot/%E8%87%BA%E7%81%A3%E5%9F%8E%E6%AE%98%E8%B9%9F(%E5%AE%89%E5%B9%B3%E5%8F%A4%E5%A0%A1%E5%85%A7%E7%89%86)2.jpeg",
                  s_Id: 188,
                },
              ],
              s_Lang: "zh-tw",
              s_Name: "臺灣城殘蹟(安平古堡內牆)",
              s_Summary:
                "明永曆十五年(1661)，鄭成功來台驅荷，並遷居熱蘭遮城，故名王城。清康熙二十二年(1683)，臺灣納入清國版圖，王城喪失其地位，設軍裝局。同治十年 (1871)軍火庫爆炸，城垣傾圮，清同治十三（1874）沈葆楨有鑑於淪為殘蹟的臺灣城軍事價值已失，遂大量拆除臺灣城磚石為興築二鯤鯓砲臺（今億載金城）所需建材，至此臺灣城僅餘斷垣殘壁。日明治三十年（1897），為建造安平海關宿舍，就殘蹟之上另築高台，其上在建西式洋樓，改稱安平古堡，此時台灣城原貌盡失，空留一堵殘牆為歷史見證。（施添福，1999：48頁）然依日昭",
              s_Introduction:
                "1622年荷蘭建「奧倫治」城，於1640年竣工完工並改稱為「熱蘭遮城」，城分內外兩城，內城形方，共築三層，下層位於地面下，作為倉庫，地上有兩層，上層四角有稜堡，兩角之中間有北、東、南三門，北門門額上刻有T&#39;CASTEEL ZEELDIA GEBOUWED ANNO 1634（熱蘭遮城建於１６３４年）字樣。下層四角亦有稜堡，台基各邊中央各有半圓堡，半圓形中央各有井一口。\r\n\r\n北側有小門及樓梯，可下地下室的彈藥庫。上下兩層富有雉堞，突出的稜堡附設有瞭望塔，稜堡作為砲塔之用，各有大砲五門。整座城堡係以糯米汁、糖漿、砂與牡蠣殼粉調製而成。現存城牆數段及半圓形之稜堡殘蹟各一，其中以目前安平古堡殘蹟規模最大。\r\n\r\n十五世紀末葉，葡萄牙人發現由歐洲經好望角直抵東方的航線後，西方勢力逐漸東移。首先是葡萄牙人進佔澳門，並在中國東南沿海分設領館;接著西班牙人跟進，日本人也不甘示弱；使得早想與明帝國通商的荷蘭人倍受經濟壓力。\r\n\r\n十七世紀末葉，荷蘭人兩度進佔澎湖，都被明帝國打退。西元一六二三年九月，提督雷爾生率兵，在安平港口建築竹岩，後來因明帝國攻澎湖，荷蘭軍情吃緊，而撤守軍、拆竹岩。西元一六二四年七月，又轉佔臺灣，以遜克為駐臺第一任總督，在一鯤身竹岩的舊址上構築城垣，由於磚石奇缺，先用砂土及不板建造，稱為奧倫尼亞城。西元一六二七年改名為熱蘭遮城，並就城垣材料，逐步改為磚石構造。全部工程於西元一六三三年元月一日完成，這便是初期的臺灣城（臺灣城又稱王城、赤嵌城、安平城）。又因原為荷蘭人所建，早期的漢人稱荷蘭人為紅毛，所以把這座魏峨的域稱為紅毛城。日治時期改建後，稱為安平古堡，沿用至今。\r\n\r\n明永曆十五年(1661)，鄭成功來台驅荷，並遷居熱蘭遮城，故名王城。清康熙二十二年(1683)，臺灣納入清國版圖，王城喪失其地位，設軍裝局。同治十年 (1871)軍火庫爆炸，城垣傾圮，清同治十三（1874）沈葆楨有鑑於淪為殘蹟的臺灣城軍事價值已失，遂大量拆除臺灣城磚石為興築二鯤鯓砲臺（今億載金城）所需建材，至此臺灣城僅餘斷垣殘壁。日明治三十年（1897），為建造安平海關宿舍，就殘蹟之上另築高台，其上在建西式洋樓，改稱安平古堡，此時台灣城原貌盡失，空留一堵殘牆為歷史見證。（施添福，1999：48頁）然依日昭和11年（1936）栗山俊一繪製之復原圖推測，角（外）城似有內、外城壁，此外，除已經指定者外，當時外城尚有五段殘蹟。\r\n\r\n位於古堡街、國勝路、安平路85巷及安北路圍塑概成「L」形街廓內，分佈六段疑似台灣城殘蹟。\r\n\r\n其一隱於國勝路71、73、75、77、79號後民宅間，概與國勝路平行，推測應為角（外）城北側城牆殘蹟，約高2公尺，長38.7公尺，2公尺厚，牆上有一寬約2公尺，1.5公尺高門洞（曾國恩建築師事務所，1993：100頁）；二、三段分別藏身於國勝路67號及與其相連之棺材店間圍牆，二者總長約1.5公尺，皆約高2.7公尺，前者厚約0.5公尺，其分段長度不詳；其四位於西龍殿後，初步推斷，疑似角（外）城西南側稜堡殘蹟，約長15.15公尺，高5.4公尺，側立面呈梯形，下寬上窄，城厚不詳；另五、六兩段，前者是安龍壇東北面圍牆與國勝路67號為界，約長7.63公尺，高1.81公尺，城厚不詳，牆上開有葫蘆形門洞，觀構造用磚之尺寸、灰漿推測似非台灣城殘蹟；後者乃國勝路75號前之外圍牆，約長3.18公尺，高2公尺，厚0.32公尺，多為花台所掩，難以窺其全貌。綜上所述，城殘蹟受限其夾於二宅間，縫隙狹小，無法容身測度其長、厚，未盡之處尚待進一步調查。\r\n\r\n民國九十年九月，台南市政府推動「安平港國家歷史風景區」計畫，曾以非破壞性的透地雷達探測，獲知多處內城牆基遺址；並結合建築、土木與考古的科技整合，進行學術性的歷史考古頗有斬獲。民國九十三年九月，台南市政府將相關外城遺蹟列為「市定古蹟」，名曰「熱蘭遮城城垣暨城內建築遺構」，加以保存維護。館畔暸望塔為近代所建，登塔極目遠眺，依稀可以凝視海岸，遙想鹿耳門明軍登陸、北線尾荷蘭熱堡，或作「海堡」兩軍交戰，鄭氏功業已成永恆。\r\n&nbsp;\r\n\r\n安平小砲臺\r\n位在台灣城殘蹟西側，砲台護城石堤呈狹長狀南北延伸，安平小砲台包括砲台主體及北面的護城石堤。 砲台主體位在水池公園旁，為花崗石、卵石砌成，南北西面有六個磚造雉堞，其下有地下彈藥庫的設置，砲台地面為油面磚，台上原為英式B.P.九磅彈前膛鐵砲，現在所見的砲已非原物；北面的石堤以咾咕石堆砌，三合土填築而成，留有射口，射口設有柵門擋水，石堤前半部深入民宅與王城西社區活動 中心空地而緊鄰民宅；後半部則是以舊砲台為主的石堤，隔道路臨廣場、低矮的民宅、與幼稚園、天主堂，西側為魚塭，形成線形防禦系統。\r\n\r\n&nbsp;",
              s_OpenTime:
                "週一到週四 8:30-17:30\r\n週五到週日（及國定假日） 8:30-20:00",
              s_District: "安平區",
              s_Address: "708 臺南市安平區國勝路82號",
              s_Tel: "+886-6-2267348",
              s_Fax: "",
              s_Latitude: 23.0019,
              s_Longitude: 120.1607,
              s_Services: "",
              s_Category: "在地藝文",
              s_UpdateTime: "2022-02-02 12:00:59",
              s_Stars: 4.4,
              s_Reviews: 50,
              s_Likes: null,
            },
            tl_TransportMode: "car",
            tl_TransportTime: 600,
            tl_StayTime: 3600,
            tl_Day: 1,
            tl_Order: 1,
            tl_Notes: null,
            tl_score: 0,
            t_Id: 1,
            s_Id: 188,
            f_Id: null,
            h_Id: null,
          },
        ],
        t_Name: "台南古蹟四日遊",
        t_Description: "test",
        t_FormTime: "2023-07-01T14:05:41.550683Z",
        t_StartDate: "2023-05-18",
        t_EndDate: "2023-05-22",
        t_StayDay: 4,
        t_Privacy: "n",
        t_Views: 4,
        t_Likes: 4,
        t_score: 2,
      },
      {
        t_Id: 2,
        startTime: {},
        account: {
          account: "daniel",
          password:
            "pbkdf2_sha256$390000$nP7wAsPsi4dtdR2qvicuJD$i6pfpJnalFAEKvEoouKc5rCTNPbWnOMNDf2ra9FDzN4=",
          username: "daniel",
          email: "daniel@gmail.com",
          rank: 999,
        },
        travel_list_detail: [],
        t_Name: "台南古蹟三日遊",
        t_Description: " ",
        t_FormTime: "2023-07-01T14:00:26.055264Z",
        t_StartDate: "2023-05-22",
        t_EndDate: "",
        t_StayDay: 4,
        t_Privacy: "y",
        t_Views: 0,
        t_Likes: 0,
        t_score: 0,
      },
    ]);
  }, []);

  return (
    <ItineraryListContext.Provider value={{ itineraryList, setItineraryList }}>
      {children}
    </ItineraryListContext.Provider>
  );
}

export default ItineraryListContext;
