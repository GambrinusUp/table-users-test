// @ts-nocheck
import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./SearchInput.module.scss";

import {
  fetchUsers,
  filterUsersByKey,
} from "../../store/users/usersActionCreator";

function SearchInput() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("firstName");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleClickSearch = () => {
    if (inputValue !== "") {
      dispatch(filterUsersByKey({ key: selectValue, value: inputValue }));
    }
  };

  const handleClickCancel = () => {
    setInputValue("");
    dispatch(fetchUsers());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClickSearch();
    }
  };

  return (
    <div className={styles.input_container}>
      <div className={styles.input_search}>
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Например, `Emily`"
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleClickCancel}>✖</button>
      </div>
      <div className={styles.input_control}>
        <select value={selectValue} onChange={handleSelectChange}>
          <option value="firstName">По имени</option>
          <option value="lastName">По фамилии</option>
          <option value="age">По возрасту</option>
          <option value="gender">По полу</option>
          <option value="phone">По номеру телефона</option>
          <option value="address.city">По городу</option>
          <option value="address.address">По улице</option>
        </select>
        <button onClick={handleClickSearch}>Поиск</button>
      </div>
    </div>
  );
}

export default SearchInput;
