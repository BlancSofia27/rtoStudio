import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  service: null,
  serviceDays: [],
  date: null,
  hour:null,
  profesional:null
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    selectService: (state, action) => {
      state.service = action.payload.name;
      state.serviceDays = action.payload.days;
    },
    selectDate: (state, action) => {
        state.date = action.payload;
      },
      selectHour: (state, action) => {
        state.hour = action.payload;
      },
      selectProfesional: (state, action) => {
        state.profesional = action.payload;
      },
      resetStates: (state) => {
        state.service = null;
        state.date = null;
        state.hour = null;
        state.profesional = null;
      },
  },
});

export const { selectService, selectDate, selectHour, selectProfesional, resetStates } = servicesSlice.actions;
export default servicesSlice.reducer;
