import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const devicesAdapter = createEntityAdapter();

const initialState = devicesAdapter.getInitialState({
  devicesLoadingStatus: "idle",
  devicesLength: 0,
  activeDevice: {},
});

export const fetchFilteredDevices = createAsyncThunk(
  "devices/fetchFilteredDevices",
  async (_, { getState }) => {
    const state = getState().filter;
    const { brandFilter, typeFilter, page } = state;
    const { request } = useHttp();
    if (brandFilter && typeFilter) {
      return await request(
        `https://online-e-commerce-app.vercel.app:3000/products?brand=${brandFilter}&type=${typeFilter}&_page=${page}&_limit=16`
      );
    } else if (brandFilter) {
      return await request(
        `https://online-e-commerce-app.vercel.app:3000/products?brand=${brandFilter}&_page=${page}&_limit=16`
      );
    } else if (typeFilter) {
      return await request(
        `https://online-e-commerce-app.vercel.app:3000/products?&type=${typeFilter}&_page=${page}&_limit=16`
      );
    } else {
      return await request(
        `https://online-e-commerce-app.vercel.app:3000/products?&_page=${page}&_limit=16`
      );
    }
  }
);

export const fetchDevicesLength = createAsyncThunk(
  "devices/fetchDevicesLength",
  async (_, { getState }) => {
    const state = getState().filter;
    const { brandFilter, typeFilter, page } = state;
    const { request } = useHttp();
    if (brandFilter && typeFilter) {
      const req = await request(
        `https://online-e-commerce-app.vercel.app:3000/products?brand=${brandFilter}&type=${typeFilter}`
      );
      return Object.keys(req).length;
    } else if (brandFilter) {
      const req = await request(
        `https://online-e-commerce-app.vercel.app:3000/products?brand=${brandFilter}`
      );
      return Object.keys(req).length;
    } else if (typeFilter) {
      const req = await request(
        `https://online-e-commerce-app.vercel.app:3000/products?&type=${typeFilter}`
      );
      return Object.keys(req).length;
    } else {
      const req = await request(`https://online-e-commerce-app.vercel.app:3000/products`);
      return Object.keys(req).length;
    }
  }
);

export const fetchDevice = createAsyncThunk(
  "devices/fetchDevice",
  async (id) => {
    const { request } = useHttp();
    return await request(`https://online-e-commerce-app.vercel.app:3000/products/${id}`);
  }
);


const deviceSlice = createSlice({
  name: "device",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredDevices.pending, (state) => {
        state.devicesLoadingStatus = "loading";
      })
      .addCase(fetchFilteredDevices.fulfilled, (state, action) => {
        state.devicesLoadingStatus = "idle";
        devicesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchFilteredDevices.rejected, (state) => {
        state.devicesLoadingStatus = "error";
      })
      .addCase(fetchDevicesLength.fulfilled, (state, action) => {
        state.devicesLength = action.payload;
      })
      .addCase(fetchDevice.fulfilled, (state, action) => {
        state.activeDevice = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = deviceSlice;
export default reducer;
