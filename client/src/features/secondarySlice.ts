import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { secondaryState } from "../vite-env";

export const hydrateQuestions = createAsyncThunk("hydrateQuestions", async (payload: any, thunkAPI) => {
  try {
    const resp = await axios.get(`http://localhost:8900/questions/get`, { params: { depth: payload.depth, DpVP: payload.DpVP } });
    

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});

export const postQuestion = createAsyncThunk("publishQuestion", async (payload, thunkAPI) => {
  try {
    const resp = await axios.post(import.meta.env.VITE_SERVER_URL + "questions/publish-question", payload);

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const hydrateReplies = createAsyncThunk("hydrateReplies", async (payload, thunkAPI) => {
  try {
    const resp = await axios.post(import.meta.env.VITE_SERVER_URL + "replies/get", { qid: payload });

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const postReply = createAsyncThunk("postReplies", async (payload, thunkAPI) => {
  try {
    const resp = await axios.post(import.meta.env.VITE_SERVER_URL + "replies/reply", payload);

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});

export const hydrateEvents = createAsyncThunk("hydrateEvents", async (payload: any, thunkAPI) => {
  try {
    const resp = await axios.get(import.meta.env.VITE_SERVER_URL + "events/get/", {
      params: { upThreshold: payload.upThreshold, bottomThreshold: payload.bottomThreshold },
    });

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});

export const postEvent = createAsyncThunk("postEvent", async (payload, thunkAPI) => {
  try {
    const resp = await axios.post(import.meta.env.VITE_SERVER_URL + "events/post-event", payload);

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const createAnnouncement = createAsyncThunk("createAnnouncement", async (payload, thunkAPI) => {
  try {
    const resp = await axios.post(import.meta.env.VITE_SERVER_URL + "announcements/create-announcement", payload, {headers: {"content-type": "multipart/form-data"}});

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});

export const hydrateAnnouncements = createAsyncThunk("hydrateAnnouncements`", async (payload: any, thunkAPI) => {
  try {
    const resp = await axios.get(import.meta.env.VITE_SERVER_URL + "announcements/get/");

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});

const initialState: secondaryState = {
  questions: [],
  replies: [],
  events: [],
  isLoading: true,
  announcements: [],
};

const secondarySlice = createSlice({
  name: "secondarySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrateQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(hydrateQuestions.rejected, (state, action) => {});
    builder.addCase(hydrateQuestions.pending, (state, action) => {});

    builder.addCase(hydrateEvents.fulfilled, (state, action) => {
      state.events = action.payload;
    });
    builder.addCase(hydrateEvents.rejected, (state, action) => {});
    builder.addCase(hydrateEvents.pending, (state, action) => {});

    builder.addCase(hydrateAnnouncements.fulfilled, (state, action) => {
      state.announcements = action.payload;
    });
    builder.addCase(hydrateAnnouncements.rejected, (state, action) => {});
    builder.addCase(hydrateAnnouncements.pending, (state, action) => {});

    builder.addCase(postQuestion.fulfilled, (state, action) => {
      // @ts-ignore
      state.questions.push(action.payload);
    });
    builder.addCase(postQuestion.rejected, (state, action) => {});
    builder.addCase(postQuestion.pending, (state, action) => {});

    builder.addCase(hydrateReplies.fulfilled, (state, action) => {
      // @ts-ignore
      state.replies.push(action.payload);
    });
    builder.addCase(hydrateReplies.rejected, (state, action) => {});
    builder.addCase(hydrateReplies.pending, (state, action) => {});

    builder.addCase(postReply.fulfilled, (state, action) => {
      
      // @ts-ignore
      state.replies.find((reply) => reply.qid === action.payload._qid)?.replies.unshift(action.payload);
    });
    builder.addCase(postReply.rejected, (state, action) => {});
    builder.addCase(postReply.pending, (state, action) => {});

    builder.addCase(postEvent.fulfilled, (state, action) => {
      
      // @ts-ignore
      state.events.unshift(action.payload);
    });
    builder.addCase(postEvent.rejected, (state, action) => {});
    builder.addCase(postEvent.pending, (state, action) => {});

    builder.addCase(createAnnouncement.fulfilled, (state, action) => {
      
      // @ts-ignore
      state.announcements.unshift(action.payload);
    });
    builder.addCase(createAnnouncement.rejected, (state, action) => {});
    builder.addCase(createAnnouncement.pending, (state, action) => {});
  },
});

export default secondarySlice.reducer;
