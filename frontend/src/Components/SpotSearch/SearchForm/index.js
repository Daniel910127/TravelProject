import React, { useEffect, useState, useContext,useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import produce from "immer";
import DetailButton from "./DetailButton";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import style from "./SearchForm.module.scss";
import { useSearchParams } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";
import { SearchStateContext } from "../SearchContext";
import { set } from "react-hook-form";
import { Category } from "@mui/icons-material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  TextField,
  InputAdornment,
  Input,
  OutlinedInput,
  Button,
  Paper,
} from "@mui/material";
import CustomMuiTypography from "../../CustomMuiTypography";
const categoryMap = {
  spot: [
    { title: "歷史古蹟", isChecked: false },
    { title: "生態教育", isChecked: false },
    { title: "觀光工廠", isChecked: false },
    { title: "宗教廟宇", isChecked: false },
    { title: "自然景觀", isChecked: false },
    { title: "地方展館", isChecked: false },
    { title: "在地藝文", isChecked: false },
    { title: "戶外運動", isChecked: false },
    { title: "夜市夜遊", isChecked: false },
    { title: "公園綠地", isChecked: false },
    { title: "休閒農漁", isChecked: false },
    { title: "溫泉度假", isChecked: false },
    { title: "主題園區", isChecked: false },
    { title: "消費娛樂", isChecked: false },
    { title: "無障礙設施", isChecked: false },
    { title: "景觀吊橋", isChecked: false },
    { title: "風景區", isChecked: false },
  ],
  food: [
    { title: "飲料冰品", isChecked: false },
    { title: "地方小吃", isChecked: false },
    { title: "中式美食", isChecked: false },
    { title: "伴手好禮", isChecked: false },
    { title: "麵食醬料", isChecked: false },
    { title: "甜點糕餅", isChecked: false },
    { title: "咖啡茶鋪", isChecked: false },
    { title: "農產好物", isChecked: false },
    { title: "柑仔店", isChecked: false },
    { title: "異國料理", isChecked: false },
    { title: "景觀餐廳", isChecked: false },
    { title: "素食主義", isChecked: false },
    { title: "穆斯林友善", isChecked: false },
    { title: "安心餐廳", isChecked: false },
  ],
  hotel: [
    { title: "旅館", isChecked: false },
    { title: "民宿", isChecked: false },
  ],
};

const SearchCheckBox = styled(Paper)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  top: "-10px",
  // left: -5px,
  backgroundColor: "white",
  padding: "4.6rem 1rem 1rem 1rem",
  paddingTop: "4.6rem",
}));

const CheckList = styled("ul")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.4rem",
  marginBottom: "1.2rem",
}));

export default function SearchForm(props) {
  // let [searchParams, setSearchParams] = useSearchParams();
  const {
    searchParams,
    setSearchParams,
    spotFilter,
    filterSpots,
    setFilterSpots,
    spots,
  } = useContext(SearchStateContext);

  const { type } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [isInit, setIsInit] = useState(false);

  const [category, setCategory] = useState([]);

  const [regions, setRegions] = useState([
    { region: "中西區", isChecked: false },
    { region: "東區", isChecked: false },
    { region: "南區", isChecked: false },
    { region: "北區", isChecked: false },
    { region: "安平區", isChecked: false },
    { region: "安南區", isChecked: false },
    { region: "永康區", isChecked: false },
    { region: "歸仁區", isChecked: false },
    { region: "新化區", isChecked: false },
    { region: "左鎮區", isChecked: false },
    { region: "玉井區", isChecked: false },
    { region: "楠西區", isChecked: false },
    { region: "南化區", isChecked: false },
    { region: "仁德區", isChecked: false },
    { region: "關廟區", isChecked: false },
    { region: "龍崎區", isChecked: false },
    { region: "官田區", isChecked: false },
    { region: "麻豆區", isChecked: false },
    { region: "佳里區", isChecked: false },
    { region: "西港區", isChecked: false },
    { region: "七股區", isChecked: false },
    { region: "將軍區", isChecked: false },
    { region: "學甲區", isChecked: false },
    { region: "北門區", isChecked: false },
    { region: "新營區", isChecked: false },
    { region: "後壁區", isChecked: false },
    { region: "白河區", isChecked: false },
    { region: "東山區", isChecked: false },
    { region: "六甲區", isChecked: false },
    { region: "下營區", isChecked: false },
    { region: "柳營區", isChecked: false },
    { region: "鹽水區", isChecked: false },
    { region: "善化區", isChecked: false },
    { region: "大內區", isChecked: false },
    { region: "山上區", isChecked: false },
    { region: "新市區", isChecked: false },
    { region: "安定區", isChecked: false },
  ]);

  const searchFieldRef = useRef(null);

  // console.log(type, category,a);

  const [keyword, setKeyword] = useState("");
  const [inputKeyword, setInputKeyword] = useState("");
  let isOnComposition = false;
  // const [isOnComposition, setIsOnComposition] = useState(false);

  useEffect(() => {
    setCategory(categoryMap[type]);
  }, []);

  const initCheck = () => {
    let updateCategory = produce(category, (draft) => {
      category.forEach((item, index) => {
        if (searchParams.getAll("category").includes(item.title)) {
          draft[index].isChecked = true;
        } else {
          draft[index].isChecked = false;
        }
      });
    });

    let updateRegions = produce(regions, (draft) => {
      regions.forEach((item, index) => {
        if (searchParams.getAll("region").includes(item.region)) {
          draft[index].isChecked = true;
        } else {
          draft[index].isChecked = false;
        }
      });
    });
    let updateKeyword = searchParams.get("keyword")
      ? searchParams.get("keyword")
      : "";

    setCategory(updateCategory);
    setRegions(updateRegions);
    setKeyword(updateKeyword);
    setInputKeyword(updateKeyword);
    // setIsInit(true);
  };

  const checkCategory = (category) => {
    console.log("initcategory", category);
    let updateCategory = produce(category, (draft) => {
      category.forEach((item, index) => {
        if (searchParams.getAll("category").includes(item.title)) {
          draft[index].isChecked = true;
        } else {
          draft[index].isChecked = false;
        }
      });
    });

    return updateCategory;
  };

  useEffect(() => {
    initCheck();
    setCategory(checkCategory(categoryMap[type]));
  }, [type]);

  const handleCompositionStart = (e) => {
    //composition進行中，代表正在輸入中文
    isOnComposition = true;
  };

  const handleCompositionEnd = (e) => {
    console.log('end of composition')
    isOnComposition = false;
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const checkedCategoryTitles = category
      .filter((item) => item.isChecked)
      .map((item) => item.title);

    const checkedRegionsTitles = regions
      .filter((item) => item.isChecked)
      .map((item) => item.region);

    setFilterSpots(
      spotFilter(checkedCategoryTitles, checkedRegionsTitles, keyword)
    );
  }, [category, regions, keyword]);

  const resultCount = () => {
    return !isOpen
      ? "進階搜尋"
      : `共
    ${
      category.some((item) => item.isChecked === true) ||
      regions.some((item) => item.isChecked === true) ||
      keyword.length > 0
        ? filterSpots.length
        : spots.length
    }
    個結果`;
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        initCheck();
        setIsOpen(false);
      }}
    >
      <form
        className={style.searchBox}
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(false);
          
          searchFieldRef.current.blur()
        }}
      >
        <OutlinedInput
          sx={{ zIndex: 9999, margin: "0 1rem" }}
          inputRef={searchFieldRef}
          fullWidth
          value={inputKeyword}
          onChange={(e) => {
            console.log('onchange')
            // setKeyword(e.target.value);
            setInputKeyword(e.target.value);
            if (!isOnComposition) {
              setKeyword(e.target.value);
            }
          }}
          onFocus={() => {
            console.log("is open");
            setIsOpen(true);
          }}

          onBlur={()=>{
            const checkedRegions = regions
            .filter((item) => item.isChecked)
            .map((item) => item.region);
          const checkedCategory = category
            .filter((item) => item.isChecked)
            .map((item) => item.title);
          let params = {
            region: checkedRegions,
            category: checkedCategory,
            keyword: keyword,
          };
          setSearchParams(params);
          }}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">{resultCount()}</InputAdornment>
          }
        />

        {isOpen && (
          <SearchCheckBox>
            <CustomMuiTypography variant="h5" gutterBottom>
              主題類型
            </CustomMuiTypography>
            <CheckList>
              {category.map((categoryItem, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      // e.stopPropagation();
                      const updateCategory = produce(category, (draft) => {
                        draft[index].isChecked = !categoryItem.isChecked;
                      });
                      // console.log('@@@@',updateCategory);
                      setCategory(updateCategory);
                    }}
                  >
                    <DetailButton
                      title={categoryItem.title}
                      isChecked={categoryItem.isChecked}
                    />
                  </li>
                );
              })}
            </CheckList>

            <CustomMuiTypography variant="h5" gutterBottom>
              行政區域
            </CustomMuiTypography>
            <CheckList>
              {regions.map((regionItem, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      // e.stopPropagation();
                      const updateRegions = produce(regions, (draft) => {
                        draft[index].isChecked = !regionItem.isChecked;
                      });
                      setRegions(updateRegions);
                    }}
                  >
                    <DetailButton
                      title={regionItem.region}
                      isChecked={regionItem.isChecked}
                    />
                  </li>
                );
              })}
            </CheckList>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0 0 0",
                borderTop: "1px solid #bbb",
              }}
            >
              <Button
                onClick={(e) => {
                  // e.stopPropagation();
                  e.preventDefault();
                  const updateRegions = produce(regions, (draft) => {
                    draft.forEach((item) => {
                      item.isChecked = false;
                    });
                  });
                  const updateCategory = produce(category, (draft) => {
                    draft.forEach((item) => {
                      item.isChecked = false;
                    });
                  });
                  setRegions(updateRegions);
                  setCategory(updateCategory);
                  setKeyword('');
                  setInputKeyword(''); 
                }}
              >
                清除
              </Button>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  const checkedRegions = regions
                    .filter((item) => item.isChecked)
                    .map((item) => item.region);
                  const checkedCategory = category
                    .filter((item) => item.isChecked)
                    .map((item) => item.title);
                  let params = {
                    region: checkedRegions,
                    category: checkedCategory,
                    keyword: keyword,
                  };
                  setSearchParams(params);
                  //console.log(searchParams.getAll("category"));
                }}
              >
                共有
                {category.some((item) => item.isChecked === true) ||
                regions.some((item) => item.isChecked === true) ||
                keyword.length > 0
                  ? filterSpots.length
                  : spots.length}
                個結果
              </Button>
            </div>
          </SearchCheckBox>
        )}

        {/* <button
          onClick={(e) => {
            e.preventDefault();
            setCategory(categoryMap[type]);
          }}
        ></button> */}
      </form>
    </ClickAwayListener>
  );
}
