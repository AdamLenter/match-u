import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/items/itemsSlice';
import matchesReducer from '../features/matches/matchesSlice';


export const store = configureStore({
  reducer: {
    items: itemsReducer,
    matches: matchesReducer
  },
})

export default store;