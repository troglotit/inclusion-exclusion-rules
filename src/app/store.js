import { configureStore } from "@reduxjs/toolkit";
import rulesReducer from "../features/rules/rulesSlice";

export default configureStore({
  reducer: {
    rules: rulesReducer,
  },
});
