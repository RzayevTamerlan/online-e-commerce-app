import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filter from "../components/TypeBar/filterSlice";
import devices from "../components/DeviceList/devicesSlice";
import basket from "../components/BasketItem/basketSlice";
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ filter, basket, devices });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['basket']
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store)

export default store;
