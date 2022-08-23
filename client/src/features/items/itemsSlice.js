import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";

export const fetchItems = createAsyncThunk('items/fetchItems', () => {
  return fetch("/items")
  .then((r)=>r.json())
  .then((listOfItems) => listOfItems
  )
  }
)

const itemsSlice = createSlice({
name: "items",
  initialState: {
    items: [], 
    status: "idle", 
    error: [], 
  },
reducers: { 
  },
extraReducers: {
  [fetchItems.pending](state){
  state.status = "Pending"},
  [fetchItems.fulfilled](state, action){
    if(state.items.length === 0) {
      state.items = action.payload}
    }
}
});
export const {  } = itemsSlice.actions;
export default itemsSlice.reducer;






