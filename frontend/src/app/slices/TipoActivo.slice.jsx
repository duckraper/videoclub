import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  edit: null,
  noHere: true,
  clone: null,
};

export const tipoActivoSlice = createSlice({
  name: "tipo",
  initialState,
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setNoHere: (state, action) => {
      state.noHere = action.payload;
    },
    setClone: (state, action) => {
      state.clone = action.payload;
    },
  },
});

export const { setNoHere, setEdit, setClone } = tipoActivoSlice.actions;

export const tipo_state = (state) => state.tipo;

export default tipoActivoSlice.reducer;
