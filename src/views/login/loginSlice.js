import {createSlice} from '@reduxjs/toolkit';

export default createSlice({
  name: 'login',
  initialState: {
    accountName: '',
  },
  reducers: {
    postLogin: (state, action) => {
      // mutation || IMMER
      state.login = action.payload;
    },
  },
});
