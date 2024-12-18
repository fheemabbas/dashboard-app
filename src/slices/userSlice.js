import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (page, thunkAPI) => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    totalPages: 0,
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.data;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
