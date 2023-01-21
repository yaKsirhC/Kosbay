import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { user, userState } from "../vite-env";

export const hydrateUserInfo = createAsyncThunk("hydrateUserInfo", async (payload, thunkAPI) => {
  try {
    const resp = await axios.get(import.meta.env.VITE_SERVER_URL + "users/get/user-info", { params: { uid: payload } });
    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const follow = createAsyncThunk("follow", async (payload, thunkAPI) => {
  try {
    const resp = await axios.post(import.meta.env.VITE_SERVER_URL + "users/follow", { follow: payload });
    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const unfollow = createAsyncThunk("unfollow", async (payload, thunkAPI) => {
  try {
    const resp = await axios.post(import.meta.env.VITE_SERVER_URL + "users/unfollow", { unfollow: payload });
    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const changeImgBanner = createAsyncThunk("changeImgBanner", async (payload, thunkAPI) => {
  try {
    const resp = await axios.post(import.meta.env.VITE_SERVER_URL + "users/place-image-banner", payload, {
      headers: { "content-type": "multipart/form-data" },
    });
    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});

const initialState: userState = {
  isLoading: true,
  userInfo: {
    _id: "",
    Announcements: [],
    Conversations: [],
    Email: "",
    Events: [],
    Followed: [],
    Followers: [],
    ImgBanner: "",
    IsSuper: false,
    joinedAt: 0,
    Name: "",
    Password: "",
    Products: [],
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrateUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(hydrateUserInfo.rejected, (state, action) => {});
    builder.addCase(hydrateUserInfo.pending, (state, action) => {});

    builder.addCase(follow.fulfilled, (state, action) => {
      (state.userInfo as user).Followers.push(action.payload);
    });
    builder.addCase(follow.rejected, (state, action) => {});
    builder.addCase(follow.pending, (state, action) => {});

    builder.addCase(unfollow.fulfilled, (state, action) => {
      (state.userInfo as user).Followers.splice(action.payload, 1);
    });
    builder.addCase(unfollow.rejected, (state, action) => {});
    builder.addCase(unfollow.pending, (state, action) => {});

    builder.addCase(changeImgBanner.fulfilled, (state, action) => {
      (state.userInfo as user).ImgBanner = action.payload;
    });
    builder.addCase(changeImgBanner.rejected, (state, action) => {});
    builder.addCase(changeImgBanner.pending, (state, action) => {});
  },
});

export default userSlice.reducer;
