import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IMessage {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface IPagination {
  limit: number;
  links: {
    previous: string | null;
    next: string | null;
    current: string;
  };
  page: number;
  pages: number;
  total: number;
}

interface IState {
  messages: IMessage[];
  pagination: IPagination;
  status: "idle" | "loading" | "error";
}

const initialState: IState = {
  messages: [],
  pagination: {
    total: 2862,
    pages: 287,
    page: 1,
    limit: 10,
    links: {
      previous: null,
      current: "https://gorest.co.in/public/v1/users?page=1",
      next: null,
    },
  },
  status: "idle",
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = state.messages.concat(
          action.payload.data.sort((a: IMessage, b: IMessage) =>
            a.id > b.id ? 1 : -1
          )
        );
        state.pagination = action.payload.meta.pagination;
        state.status = "idle";
      })
      .addCase(getMessages.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { reset } = messagesSlice.actions;
export default messagesSlice.reducer;

export const getMessages = createAsyncThunk(
  "posts/fetchMessages",
  async (fetchURL: string) => {
    const data = await fetch(fetchURL);
    const result = await data.json();
    return result;
  }
);
