import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const basketAdapter = createEntityAdapter();

const initialState = basketAdapter.getInitialState({
  basket: [],
  basketTotalPrice: null,
});

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    incementDevice: (state, action) => {
      state.basket[action.payload].count += 1;
    },
    changeCount: (state, action) => {
      state.basket[action.payload[1]].count = Number(action.payload[0]);
    },
    addDeviceToBasket: (state, action) => {
      state.basket.push(action.payload);
    },
    deleteDeviceFromBasket: (state, action) => {
      state.basket = state.basket.filter((item) => action.payload !== item.id);
    },
    clearBasket: (state) => {
      state.basket = [];
    },
    findTotalValueOfBasket: (state) => {
      state.basketTotalPrice = state.basket.reduce((acum, next) => {
        return Number(acum) + Number(next.price) * Number(next.count);
      }, 0);
    },
  },
});

const { actions, reducer } = basketSlice;

export default reducer;

export const {
  addDeviceToBasket,
  deleteDeviceFromBasket,
  clearBasket,
  findTotalValueOfBasket,
  incementDevice,
  changeCount
} = actions;
