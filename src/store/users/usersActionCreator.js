// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";

import { usersAPI } from "../../api/usersAPI";

// Асинхронные действия для получения данных пользователей

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      // Выполнение асинхронного запроса для получения списка пользователей
      const users = await usersAPI.getUsers();
      return users;
    } catch (error) {
      // Обработка ошибки: возвращение значения с ошибкой
      return rejectWithValue(error || "Failed to fetch users");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const user = await usersAPI.getUserById(userId);
      return user;
    } catch (error) {
      return rejectWithValue(error || "Failed to fetch user");
    }
  }
);

export const filterUsersByKey = createAsyncThunk(
  "users/filterUsersByKey",
  async ({ key, value }, { rejectWithValue }) => {
    try {
      const users = await usersAPI.filterUserByKey(key, value);
      return users;
    } catch (error) {
      return rejectWithValue(error || "Failed to filter users");
    }
  }
);
