import {
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const basketAdapter = createEntityAdapter();

const initialState = basketAdapter.getInitialState({
  basket:[],
  basketTotalPrice:null,
});

const basketSlice = createSlice({
  name:"basket",
  initialState,
  reducers: {
    addDeviceToBasket: (state,action) => {
      state.basket.push(action.payload);
    },
    deleteDeviceFromBasket: (state,action) => {
      state.basket = state.basket.filter(item => action.payload !== item.id);
    },
    clearBasket: (state) => {
      state.basket = [];
    },
    findTotalValueOfBasket: (state) => {
      state.basketTotalPrice = state.basket.reduce((acum,next) => {
        return Number(acum) + Number(next.price);
      },0)
    }
  },
})

const { actions, reducer } = basketSlice;

export default reducer;

export const {
  addDeviceToBasket,
  deleteDeviceFromBasket,
  clearBasket,
  findTotalValueOfBasket,
} = actions;
