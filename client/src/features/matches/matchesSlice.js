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
  addMatch(state, action) {
    state.matches.push(action.payload);
  },
  updateMatch(state, action) {
    let matchToUpdate = state.matches.find((match) => match.id === action.payload.id);
    matchToUpdate = action.payload;
  }
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
export const { addMatch, updateMatch } = matchesSlice.actions;
export default matchesSlice.reducer;






