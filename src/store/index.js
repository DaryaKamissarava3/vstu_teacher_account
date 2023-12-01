import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { authReducer } from './authSlice';
import { scheduleReducer } from './scheduleSlice';
import { weekDataReducer } from './weekDataSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducer,
  weekData: weekDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true
    }).concat(thunk),
});

export const persistor = persistStore(store);
