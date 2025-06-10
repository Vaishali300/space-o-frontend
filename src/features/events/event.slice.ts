import { createSlice } from "@reduxjs/toolkit";
import type { IEvent } from "../../types/event.types";
import type { AppState } from "../../store/store";
import { STATUS } from "../../lib/constants";

const initialState: IEvent = {
  isCreateEvent: false,
  eventState: STATUS.IDEL,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    recipe: (state) => {
      return state;
    },
    setCreateEventModalVisibility: (state, action) => {
      state.isCreateEvent = action.payload;
    },
  },
  extraReducers: () => {},
});

export default eventSlice.reducer;
export const eventState = (state: AppState) => state;
export const eventAction = eventSlice.actions;
