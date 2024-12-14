import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root', // Key in localStorage
    storage,     // Storage engine (localStorage here)
    whitelist: ['auth'], // Persist only the `user` slice
  };

const composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const rootReducer = combineReducers({
    auth: authReducer       // Slice to be persisted
});
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const authStore = createStore(persistedReducer,composeEnhancers);
  const persistor = persistStore(authStore);
  
  export { authStore, persistor }; 
