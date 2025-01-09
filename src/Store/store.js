import { createStore, applyMiddleware, compose } from 'redux'; // Use `compose` from Redux
import { combineReducers } from 'redux'; 
import authReducer from './slice/authSlice';
import orderCountReducer from './slice/orderCountSlice';
import ordersReducer from './slice/ordersSlice';
import userInputReducer from './slice/UserInputSlice'
import dashboardMetricsReducer from './slice/dashboardMetricsSlice'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import {thunk} from 'redux-thunk';  // Import redux-thunk to handle async actions

// Persist configuration
const persistConfig = {
  key: 'root', // Key in localStorage
  storage,     // Storage engine (localStorage here)
  whitelist: ['auth'], // Persist only the `auth` slice
};

// Combine reducers for different slices
const rootReducer = combineReducers({
  auth: authReducer,       // Slice to be persisted
  orderCount: orderCountReducer, // Async actions handled in orderCountReducer
  userInput: userInputReducer,
  orders: ordersReducer,
  dashboardMetrics: dashboardMetricsReducer
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux DevTools integration (only in development)
const composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) // Use the correct extension
    : compose; // Fallback to `compose` if DevTools extension is not available

// Apply middleware (thunk is necessary for handling async actions)
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))  // Apply redux-thunk middleware to handle async actions
);

// Create the persistor for Redux Persist
const persistor = persistStore(store);

export { store, persistor };
