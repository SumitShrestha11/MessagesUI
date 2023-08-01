import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "../features/messageBubble/messagesSlice";

const store = configureStore({
  reducer: {
    messages: messagesSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {messages: IStat}
export type AppDispatch = typeof store.dispatch;
