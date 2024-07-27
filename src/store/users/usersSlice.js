import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUsers,
  fetchUserById,
  filterUsersByKey,
} from "./usersActionCreator";

import { sortUsers } from "../../helpers/sortUsers";

// Начальное состояние для среза usersSlice
const initialState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  sortingConfig: [
    { column: "name", sortDirection: "default" },
    { column: "age", sortDirection: "default" },
    { column: "gender", sortDirection: "default" },
    { column: "address", sortDirection: "default" },
  ],
};

// Создание среза (slice) для управления состоянием пользователей
export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    // Сортировка массива пользователей
    setSortingConfig(state, action) {
      const { column, sortDirection } = action.payload;

      // Обновление конфигурации сортировки для выбранного столбца
      const newSortingConfig = state.sortingConfig.map((config) => {
        if (config.column === column) {
          const newDirection =
            sortDirection === "default"
              ? "asc"
              : sortDirection === "asc"
              ? "desc"
              : "default";
          return { ...config, sortDirection: newDirection };
        } else {
          return { ...config, sortDirection: "default" };
        }
      });

      state.sortingConfig = newSortingConfig; // Обновление конфигурации сортировки в состоянии

      state.users = sortUsers(state.users, newSortingConfig); // Применение сортировки к массиву пользователей
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка состояний для fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        // При загрузке
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // При успешной загрузке
        console.log(action.payload);
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        // При ошибке
        state.isLoading = false;
        state.error = action.payload;
      })
      // Обработка состояний для fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.selectedUser = null;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Обработка состояний для filterUsersByKey
      .addCase(filterUsersByKey.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterUsersByKey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = sortUsers(action.payload, state.sortingConfig);
      })
      .addCase(filterUsersByKey.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSortingConfig } = usersSlice.actions;

export default usersSlice.reducer;
