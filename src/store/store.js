import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users/usersSlice";

// Создание хранилища
export const store = configureStore({
  reducer: { users: usersReducer },
});
