import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMatches = createAsyncThunk('matches/fetchMatches', (user_contact_id) => {
  return fetch(`/my_matches/${user_contact_id}`)
  .then((r)=>r.json())
  .then((listOfMatches) => listOfMatches
  )
  }
)

const matchesSlice = createSlice({
name: "matches",
  initialState: {
    matches: [], 
    status: "idle", 
    error: [], 
  },
reducers: { 
  },
extraReducers: {
  [fetchMatches.pending](state){
  state.status = "Pending"},
  [fetchMatches.fulfilled](state, action){
    if(state.matches.length === 0) {
      state.matches = action.payload}
    }
}
});
export const {  } = matchesSlice.actions;
export default matchesSlice.reducer;






