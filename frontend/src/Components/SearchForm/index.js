import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import style from "./SearchForm.module.scss";
export default function SearchForm() {
  return (
    <form className={style.searchBox}>
      <div className={style.searchInput}>
        <div className={`input`}>
          <SearchIcon />
          <input type="text" />
        </div>
        <button>進階搜尋</button>
      </div>

      <div className={style.searchDetail}>
        

      </div>
    </form>
  );
}
