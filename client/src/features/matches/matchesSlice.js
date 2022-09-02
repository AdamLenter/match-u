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
    const index = state.matches.findIndex((match) => match.id === action.payload.id);
    state.matches[index] = action.payload;
  },
  deleteMatch(state, action) {
    const index = state.matches.findIndex((match) => match.id === action.payload);
    state.matches.splice(index, 1);
  },
  clearMatches(state, action) {
    state.matches = [];
  },
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
export const { addMatch, updateMatch, deleteMatch, clearMatches } = matchesSlice.actions;
export default matchesSlice.reducer;






