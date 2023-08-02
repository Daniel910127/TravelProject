import React, { useState } from "react";
import SpotSearch from "../../SpotSearch";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useEffect } from "react";
import { grey } from '@mui/material/colors';
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

import DraftsIcon from "@mui/icons-material/Drafts";
import ClickAwayListener from "@mui/base/ClickAwayListener";
const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  margin: '24px 0',
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  background: '#f3f4f5',
}));

const ListWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 56,
  left: 0,
  right: 0,
  zIndex: 99,
}));

const ListContainer = styled(List)(({ theme }) => ({
  background:'white',
  border: `2px solid ${grey[300]}`,
  borderRadius: theme.shape.borderRadius,
}));

export default function SearchSpot() {
  const [searchResult, setSearchResult] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setSearchResult([
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
          "全臺規模最大的王爺信仰中心\r\n南鯤鯓代天府位於北門沿海，傳說是當地漁民撿到了載有五尊神像的小船，於是將神像供奉在草寮內，早晚焚香膜拜，結果從那天起，漁民只要出海捕魚，一定滿載而歸。事蹟傳開後，香火日益鼎盛，並擇地建廟，逐漸成為當地的信仰中心。日治時期的重修，在石雕、彩繪、剪黏上皆展現高度的工藝水準，而被評定為國定古蹟。 國定民俗「南鯤鯓代天府五府千歲進香期」 五府千歲的靈驗事蹟，吸引了各地民眾前來分靈，至今全臺已有17000餘座的分靈廟。\r\n\r\n每到王爺誕辰（農曆4月中下旬、6月中旬、8月中旬、9月中旬），分靈廟便會籌組進香團前來進香謁祖，可以說是臺灣最為壯盛的王爺廟會。 到江南園林「大鯤園」一遊 由建築家漢寶德先生所設計的「大鯤園」，為一座仿中國江南式的園林，除了有優美的山水，也有傳統建築，園區內設有南鯤鯓文史館，可一覽廟宇沿革與文物。\r\n\r\n在許多台南人的記憶當中，對南鯤鯓代天府的印象就是超熱鬧的廟會，每天參拜進香的信徒及慕名而來的遊客不計其數，主要祀奉李、池、吳、朱、范等五位王爺，五位王爺與囝仔公爭地建廟的神話故事至今依然讓很多人津津樂道著，沿海的王爺信仰在這裡展露無遺，2012年11月更是完成了一件創舉，將建廟以來信徒捐贈的大大小小金牌加上廟方添購，共集結了一萬零八百兩黃金，在廟內的凌霄寶殿打造了總價約6億多，也是全球最大的黃金玉旨牌，從1984年開始，至2012年完成，可說是建廟300多年來的超大盛事。\r\n\r\n每年固定舉辦的平安鹽祭，在10~11月間就會陸陸續續的舉辦一連串的活動，每年樣子都不同的平安鹽袋更是大家排隊爭著領取收集的熱門紀念品，拿到平安鹽袋後，到廟前廣場的鹽堆拿些鹽裝入，再到香爐過爐，就是納福驅邪的小寶物。​\r\n\r\n▲友善空間：\r\n無障礙停車位：11格\r\n無障礙廁所：5間\r\n輪椅租借：10台\r\n&nbsp;\r\n主祀：李府千歲（大王）、池府千歲（二王）、吳府千歲（三王）、朱府千歲（四王）、范府千歲（五王）\r\n配祀：玉皇上帝、觀音佛祖、萬善爺（囝仔公）、中軍府、城隍爺、虎將軍、地藏王、註生娘娘、福德正神、月老神君\r\n\r\n藝品導覽：三川殿中港間「石堵」\r\n鑑賞重點：石雕技法的立體教科書\r\n\r\n南鯤鯓代天府三川殿的立面，全以石雕構成，不同於其他廟宇的是，由於廟靠近海邊，空氣中多鹽份，因此石雕會做上彩保護，靠近可以看到淺淺的色彩。\r\n\r\n除了上彩的地方特色外，每一片石雕匠師都用了不同的雕造技法。以中門為例，最上層的「知章騎馬」是透雕，將背景剔除，只保留圖案；第二層的「孔明收姜維」屬於「深浮雕」，層次較多、起伏較大的技法；第三層的「長坂坡」與「孔明舌戰群儒」用的是俗稱「內枝外葉」的技法，將石材鑿穿，但平面背景相接，在功能性上也兼具窗戶通風的效果；接在前三堵的熱鬧場景後，第四層以「陰刻」雕出花鳥形狀，在視覺上也有喘息效果；最後一層則是以「淺浮雕」雕出麒麟、鳳凰、牡丹，起伏較為平緩。\r\n「知章騎馬」使用透雕技法\r\n\r\n「孔明收姜維」使用深浮雕技法\r\n\r\n\r\n「長坂坡」與「孔明舌戰群儒」使用內枝外葉技法\r\n\r\n「杏林春燕．賜福添壽」使用陰刻技法\r\n\r\n「三王獻瑞：麒麟、鳳凰、牡丹」使用淺浮雕技法\r\n\r\n藝品導覽：正殿「蜘蛛結網藻井」\r\n鑑賞重點：在天花板結出蜘蛛網\r\n\r\n在南鯤鯓代天府的神龕前抬頭一看，會發現別有洞天&mdash;&mdash;這是藻井，傳統廟宇建築室內頂棚常見的形式之一。藻井的做法，是由一組組木頭「斗拱」組件排列成八角形或圓形，層層向上堆疊，直到屋頂處，數目眾多，令人眼花撩亂。\r\n\r\n這樣子的造型可不是匠師自由發揮，而是從《周易》64卦384爻，配合一年四季十二月令、二十四節氣、七十二候所形成的卦氣卦候圖而來。構成的形狀如同蜘蛛結網，看起來繁複又華麗，因此是觀察是匠師功力的絕佳所在。\r\n註：龕（ㄎㄢ）\r\n\r\n蜘蛛結網藻井\r\n\r\n藝品導覽：正殿「金錢壁」\r\n鑑賞重點：摸牆壁求財氣\r\n\r\n在正殿後方、青山寺的對面，有一堵人氣頗旺的牆壁，不同於一般廟宇以磚砌造，而是用澎湖運來的硓𥑮石砌成，建造於日大正15年（1926），由澎湖西嶼內塹宮的信眾所捐獻，見證了兩地間王爺信仰的密切關係。\r\n\r\n這堵牆全長6尺2乘於10尺56（約182*356公分），石材被砌成「八卦龜錦紋」樣式，又似古錢幣，枚枚相疊，塊塊相扣，而且做工細緻，幾乎看不到疊痕與縫隙，是在手工雕琢時代的佳作。由於烏龜與錢幣分別象徵長壽與財富，從下方被摸得光亮的地方就可知人氣之高。\r\n金錢壁正面一景\r\n\r\n金錢壁上的「八卦龜錦紋」樣式\r\n\r\n藝品導覽：廊道「潘麗水樑枋彩繪」\r\n鑑賞重點：國寶級匠師的彩繪廊道\r\n\r\n聚集了來自全臺的彩繪名師在此獻藝，更有「對場做」（兩匠師於不同空間、同一裝飾部位進行彩繪，較量技巧高下）的競技，使得南鯤鯓代天府有著很高的彩繪水準。\r\n\r\n而在這些作品中，高度最低、最容易欣賞的，莫過於薪傳獎藝師潘麗水在正殿兩側廊道留下的樑枋彩繪「曹操進劍」的故事來自《三國演義》，曹操以進劍之名欲暗殺專政的董卓；「舉案齊眉」出自《後漢書》，描述夫妻間相敬如賓；「驪姬巧計害申生」出自《東周列國志》，畫面中寵妾驪姬將蜂蜜淋在頭髮上，並請她欲除掉的世子申生協助驅趕蜜蜂，塑造出申生非禮的畫面，使得晉獻公廢除申生的繼承資格。在這18爿共36幅，幅幅相連的彩繪廊道裡，可以看到畫師對於文學、神話傳說、歷史故事的深厚涵養。\r\n潘麗水樑枋彩繪\r\n\r\n藝品導覽：正殿屋頂「屋脊剪黏」\r\n鑑賞重點：屋脊下的栩栩如生\r\n\r\n南鯤鯓代天府的屋頂屬於「歇山重簷式」，在每一條屋脊收尾的地方，匠師安排了各式剪黏，有人物、有動物，也有博古圖，使得屋頂看起來熱鬧非凡。\r\n\r\n中脊的燕尾下方，裝飾的是「仙翁騎鶴」，仙鶴以百片以上的瓷片組成，老翁騎在上方，跟著上揚的屋脊一起騰空；而其他的屋脊收尾處，則可以見到一手舞劍、一手拿扇的仙女，甚至是人身猴臉的孫悟空，一手拿著金箍棒，一手向上高舉，目光炯炯的望向遠方。除了人物外，也可以見到俯衝狀的「倒拋獅」、寓意「四季平安」的花瓶，都是安平剪黏名匠「葉鬃」佈置在屋脊下方的要角。\r\n「仙女舞劍」屋脊剪黏\r\n\r\n「孫悟空」屋脊剪黏\r\n\r\n「仙翁騎鶴」屋脊剪黏\r\n\r\n\r\n藝品導覽：正殿水車堵「蘆花河」剪黏\r\n鑑賞重點：走一圈欣賞隱藏版的剪黏\r\n\r\n提到剪黏，第一印象往往是在屋頂上華麗繁複的裝飾，而在南鯤鯓代天府，除了屋頂上，環繞著正殿外牆、連綿不斷的水車堵剪黏，則是由安平名匠葉鬃所作、隱藏版的欣賞重點之一。\r\n\r\n水車堵細長的空間，特別適合角色眾多的武戲場景。就算不熟悉故事的來歷，只著肚兜的蚌殼精、岸邊射箭的武將，每個人偶奮力演繹的模樣，還是值得細細品味。\r\n\r\n水車堵「蘆花河」剪黏\r\n\r\n鑑賞重點：著名的齣目「蘆花河」\r\n\r\n常見於各廟宇的「蘆花河」，說的是河神薛應龍的故事。蘆花河神薛應龍，轉世為山賊後，成為樊梨花義子協助作戰，戰亡後魂魄想要返回蘆花河，卻發現河已被惡龍所佔。不敵惡龍的薛應龍，只好托夢義父母薛丁山和樊梨花。於是薛丁山協同樊梨花等三位夫人前來助戰，瞬間整條河殺聲漫天，水翻波滾中，薛丁山一箭射中惡龍，薛應龍終於重返蘆花河。\r\n「蘆花河剪黏」特寫\r\n\r\n「蘆花河剪黏」特寫",
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
        s_Stars: 5.0,
        s_Reviews: 1,
        s_Likes: null,
      },
    ]);
  }, []);

  const handleFocus = (event) => {
    setOpen(true);
  };

  /* const handleClose = () => {
    console.log("first");
    setAnchorEl(null);
  }; */

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <SearchContainer>
        <SearchTextField
          id="standard-start-adornment"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddLocationIcon />
              </InputAdornment>
            ),
          }}
          variant="filled"
          fullWidth
          placeholder="添加其他行程"
          inputProps={{
            onFocus: handleFocus,
          }}
        />
        {open ? (
          <ListWrapper>
            <ListContainer>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddLocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Inbox"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          to Scott, Alex, Jennifer
                        </Typography>
                       
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
              </ListItem>
            </ListContainer>
          </ListWrapper>
        ) : null}
      </SearchContainer>
    </ClickAwayListener>
  );
}
