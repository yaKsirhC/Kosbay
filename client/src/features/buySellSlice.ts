import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { productState } from "../vite-env";

export const hydrateProducts = createAsyncThunk("hydrateProducts", async (payload: any, thunkAPI) => {
  try {
    const priceFilters = payload.price
    const dateFilters =  payload.date
    const resp = await axios.get(import.meta.env.VITE_SERVER_URL + "products/get", { params: { price_b: priceFilters.price_b, price_t: priceFilters.price_t, order: dateFilters.order } });
    return thunkAPI.fulfillWithValue(resp.data)

  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const hydrateSingleProduct = createAsyncThunk("hydrateSingleProduct", async (payload: any, thunkAPI) => {
  try {
    const resp = await axios.get(import.meta.env.VITE_SERVER_URL + "products/get/product/", { params: { pid: payload } });
    return thunkAPI.fulfillWithValue(resp.data)

  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const hydrateOwnProducts = createAsyncThunk("hydrateOwnProducts", async (payload: any, thunkAPI) => {
  try {
    const resp = await axios.get(import.meta.env.VITE_SERVER_URL + "products/get/owner", { params: { depth: 0, products: payload.products, uid: payload.uid} });
    return thunkAPI.fulfillWithValue(resp.data)
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const addProduct = createAsyncThunk("addProduct", async (payload, thunkAPI) => {
  try {
    console.log(payload);
    const resp = await axios.post(import.meta.env.VITE_SERVER_URL + "products/add-product", payload, {headers: {"content-type": "multipart/form-data"}});

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});
export const deleteProduct = createAsyncThunk("deleteProduct", async (payload, thunkAPI) => {
  try {
    
    const resp = await axios.delete(import.meta.env.VITE_SERVER_URL + "products/delete",{params: {pid: payload}} );

    return thunkAPI.fulfillWithValue(resp.data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("error");
  }
});


const initialState: productState = {
  isLoading: true,
  products: [],
  viewedProduct: {
    _id:'',
    _uid:'',
    Categories: [''],
    CreatedAt: 0,
    Description:'',
    Imgs: [''],
    Price:0,
    Sold: false,
    Title: ''
  },
  filters: {
    price: {
      price_b: 0,
      price_t: 4_294_967_295
    },
    date: {
      order: -1
    }
  },
  createProduct: false,

};

const buySellSlice = createSlice({
  name: "buySellSlice",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = action.payload
    },
    setShowProductForm: (state, action) => {
      state.createProduct = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateProducts.fulfilled, (state, action) => {
      state.products = action.payload as any;
    });
    builder.addCase(hydrateProducts.rejected, (state, action) => {});
    builder.addCase(hydrateProducts.pending, (state, action) => {});

    builder.addCase(hydrateSingleProduct.fulfilled, (state, action) => {
      state.viewedProduct = action.payload as any;
    });
    builder.addCase(hydrateSingleProduct.rejected, (state, action) => {});
    builder.addCase(hydrateSingleProduct.pending, (state, action) => {});

    builder.addCase(hydrateOwnProducts.fulfilled, (state, action) => {
      state.products = action.payload as any;
    });
    builder.addCase(hydrateOwnProducts.rejected, (state, action) => {});
    builder.addCase(hydrateOwnProducts.pending, (state, action) => {});

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.unshift(action.payload as any);
      state.createProduct = false
    });
    builder.addCase(addProduct.rejected, (state, action) => {});
    builder.addCase(addProduct.pending, (state, action) => {});

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const productIndex = state.products.findIndex(prod => {
        return prod._id === action.payload
      })
      if(productIndex >= 0){
        state.products.splice(productIndex,1);
      }
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {});
    builder.addCase(deleteProduct.pending, (state, action) => {});
  },
});

export const {updateFilters, setShowProductForm} = buySellSlice.actions
export default buySellSlice.reducer
