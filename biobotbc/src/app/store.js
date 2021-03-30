import { configureStore } from '@reduxjs/toolkit';
import covidGraphSliceReducer from '../features/graphs/covidGraphSlice';

export default configureStore({
  reducer: {
    covidGraph: covidGraphSliceReducer,
  },
});
