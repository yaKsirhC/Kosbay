import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { chatState } from "../vite-env";

export const getContacts = createAsyncThunk("getContacts", async (payload: any, thunkAPI) => {
  try {
    const resp = await axios.get(import.meta.env.VITE_SERVER_URL + "chat/contacts");

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const getMessages = createAsyncThunk("getMessages", async (payload: any, thunkAPI) => {
  try {
    
    const resp = await axios.get(import.meta.env.VITE_SERVER_URL + "chat/get/messages", { params: { complimentUID: payload } });

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});

const initialState: chatState = {
  isLoading: true,
  contacts: [],

  conversationContact: undefined,
  messages: [],
  socket: undefined ,
  showInlineBox: false,
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setShowInlineBox: (state, action) => {
      state.showInlineBox = action.payload;
    },
    setconversationContact: (state, action) => {
      state.conversationContact = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
    builder.addCase(getContacts.rejected, (state, action) => {});
    builder.addCase(getContacts.pending, (state, action) => {});
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload as any;
    });
    builder.addCase(getMessages.rejected, (state, action) => {});
    builder.addCase(getMessages.pending, (state, action) => {});
  },
});

export default chatSlice.reducer;
export const { setconversationContact, setShowInlineBox,setSocket ,pushMessage} = chatSlice.actions;
