import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
  typeLoadingStatus: "idle",
  brandLoadingStatus: "idle",
  brands: [],
  types: [],
  brandFilter: null,
  brandBtnId: null,
  typeFilter: null,
  typeBtnId: null,
  page: 1,
});
export const fetchBrands = createAsyncThunk("filter/fetchBrands", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/brands");
});
export const fetchTypes = createAsyncThunk("filter/fetchTypes", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/types");
});
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterChangedBrand: (state, action) => {
      state.brandFilter = action.payload;
    },
    setActiveBrand: (state, action) => {
      state.brandBtnId = action.payload;
    },
    resetBrand: (state) => {
      state.brandFilter = null;
    },
    filterChangedType: (state, action) => {
      state.typeFilter = action.payload;
    },
    setActiveType: (state, action) => {
      state.typeBtnId = action.payload;
    },
    resetType: (state) => {
      state.typeFilter = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
    decrementPage: (state) => {
      state.page = state.page - 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brandLoadingStatus = "loading";
      })
      .addCase(fetchTypes.pending, (state) => {
        state.typeLoadingStatus = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandLoadingStatus = "idle";
        state.brands = action.payload; // Обновляем состояние брендов
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.typeLoadingStatus = "idle";
        state.types = action.payload; // Обновляем состояние типов
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.brandLoadingStatus = "error";
      })
      .addCase(fetchTypes.rejected, (state) => {
        state.typeLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = filterSlice;

export default reducer;

export const {
  filterChangedBrand,
  setActiveBrand,
  resetBrand,
  filterChangedType,
  setActiveType,
  resetType,
  setPage,
  incrementPage,
  decrementPage,
} = actions;
