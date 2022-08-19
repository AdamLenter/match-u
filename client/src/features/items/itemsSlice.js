import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchItems = createAsyncThunk('items/fetchItems', () => {
  console.log("Fetching!")
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
  state.items.push(action.payload)}
}
});
export const {  } = itemsSlice.actions;
export default itemsSlice.reducer;






