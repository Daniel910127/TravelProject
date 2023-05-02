import React, { useEffect, useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import produce from "immer";
import DetailButton from "./DetailButton";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import style from "./SearchForm.module.scss";
import { useSearchParams } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";
import { SearchStateContext } from "../SearchContext";

export default function SearchForm() {
  // let [searchParams, setSearchParams] = useSearchParams();
  const {
    searchParams,
    setSearchParams,
    spotFilter,
    filterSpots,
    setFilterSpots,
    spots,
  } = useContext(SearchStateContext);
  const [isOpen, setIsOpen] = useState(false);

  const [category, setCategory] = useState([
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
  ]);

  

  const resetCategory = () => {
    let updateCategory = produce(category, (draft) => {
      category.forEach((item, index) => {
        if (searchParams.getAll("category").includes(item.title)) {
          draft[index].isChecked = true;
        } else {
          draft[index].isChecked = false;
        }
      });
    });

    // console.log(updateCategory);
    setCategory(updateCategory);
  };

  useEffect(() => {
    resetCategory();
  }, []);

  useEffect(() => {
    const checkedCategoryTitles = category
      .filter((item) => item.isChecked)
      .map((item) => item.title);

    setFilterSpots(spotFilter(checkedCategoryTitles));
  }, [category]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        console.log("clickaway");
        resetCategory();
        setIsOpen(false);
      }}
    >
      <form className={style.searchBox}>
        <div className={style.searchInput}>
          <div className={`input`}>
            <SearchIcon />
            <input
              type="text"
              onFocus={() => {
                setIsOpen(true);
              }}
            />
          </div>
          <button>進階搜尋</button>
        </div>

        {isOpen ? (
          <div className={style.searchDetail}>
            <div className="detail">
              <h4>主題類型</h4>
              <ul className="category">
                {category.map((categoryItem, index) => {
                  return (
                    <li
                      key={index}
                      onClick={(e) => {
                        // e.stopPropagation();
                        const updateCategory = produce(category, (draft) => {
                          draft[index].isChecked = !categoryItem.isChecked;
                        });
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
              </ul>
            </div>
            <div className="detail">
              <h4>行政區域</h4>
              <ul className="zipcode"></ul>
            </div>

            <button
              style={{
                padding: "6px 12px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#1976d2",
                color: "white",
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                const checkedTitles = category
                  .filter((item) => item.isChecked)
                  .map((item) => item.title);
                let params = { category: checkedTitles };
                setSearchParams(params);
                //console.log(searchParams.getAll("category"));
              }}
            >
              共有
              {category.some((item) => item.isChecked === true)
                ? filterSpots.length
                : spots.length}
              個結果
            </button>
          </div>
        ) : (
          <></>
        )}
      </form>
    </ClickAwayListener>
  );
}
