import { createSlice } from '@reduxjs/toolkit';

export const covidGraphSlice = createSlice({
  name: 'covidGraph',

  // TODO (cato): Find a way to handle error states while using a boolean and not a string in isLoaded.
  initialState: {
    isLoaded: 'false',
    selectedUSState: '',
    uSCovidData: {},
  },
  reducers: {
    addData: (state, action) => {
      const mergedCovidData = {
        ...state.uSCovidData,
        ...action.payload.responseData
      };

      state.isLoaded = action.payload.isLoaded;
      state.uSCovidData = mergedCovidData;
    },
    selectUSState: (state, action) => {
      state.selectedUSState = action.payload;
    },
  },
});

export const { addData, selectUSState } = covidGraphSlice.actions;
export const selectIsLoaded = state => state.covidGraph.isLoaded;
export const selectSelectedUSState = state => state.covidGraph.selectedUSState;
export const selectUSCovidData = state => state.covidGraph.uSCovidData;

export default covidGraphSlice.reducer;
