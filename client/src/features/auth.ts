import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const _ver = cookies.get("_ver");
const _is = cookies.get("_is") ? 1 : 0;

export const login = createAsyncThunk("login", async (payload, thunkAPI) => {
  try {
    await axios.post("http://localhost:8900/auth/log-in", payload);

    return thunkAPI.fulfillWithValue(200);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(0);
  }
});

export const signInInitialization = createAsyncThunk("signInInitialization", async (payload, thunkAPI) => {
  try {
    await axios.post(import.meta.env.VITE_SERVER_URL + "auth/sign-in/initialization", payload);

    return thunkAPI.fulfillWithValue(200);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const signInVerification = createAsyncThunk("signInVerification", async (payload, thunkAPI) => {
  try {
    await axios.post(import.meta.env.VITE_SERVER_URL + "auth/sign-in/verification", payload);

    return thunkAPI.fulfillWithValue(200);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});



const initialState = {
  auth: _ver,
  AuthBox: "",
  isSuper: 1,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthBox: (state, action) => {
      state.AuthBox = action.payload;
    },
    setToken: (state, action) => {
      state.auth = cookies.get("_ver");

      state.isSuper = cookies.get("_is");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.AuthBox = "";
      state.auth = cookies.get("_ver");
      state.isSuper = cookies.get("_is");
    });
    builder.addCase(login.rejected, (state, action) => {
    });
    builder.addCase(login.pending, (state, action) => {});

    builder.addCase(signInInitialization.fulfilled, (state, action) => {});
    builder.addCase(signInInitialization.rejected, (state, action) => {
    });

    builder.addCase(signInVerification.fulfilled, (state, action) => {
      state.AuthBox = "";
      state.auth = cookies.get("_ver");
    });
    builder.addCase(signInVerification.rejected, (state, action) => {
    });
    builder.addCase(signInVerification.pending, (state, action) => {});
  },
});

export default authSlice.reducer;
export const { setAuthBox, setToken } = authSlice.actions;
