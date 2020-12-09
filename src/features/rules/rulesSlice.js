import { createSlice } from "@reduxjs/toolkit";

const SLICE = "rules";

export const rulesSlice = createSlice({
  name: SLICE,
  initialState: {
    loading: true,
    inclusion: [],
    exclusion: [],
  },
  reducers: {
    initialize: (state, { payload }) => {
      state.loading = false;
      if (payload.inclusion) {
        state.inclusion = payload.inclusion;
      }
      if (payload.exclusion) {
        state.exclusion = payload.exclusion;
      }
    },
    addRule: (state, { payload: { ruleType } }) => {
      state[ruleType].push({
        rule: "custom",
        type: "contains",
        url: "",
      });
    },
    removeRule: (state, { payload: { ruleType, index } }) => {
      state[ruleType].splice(index, 1);
    },
    modifyRule: (state, { payload: { ruleType, index, rule } }) => {
      state[ruleType][index] = rule;
    },
  },
});

export const actions = rulesSlice.actions;

rulesSlice.actions.initFetch = () => (dispatch) => {
  fetch("/rules.json")
    .then((response) => response.json())
    .then((data) => dispatch(actions.initialize(data)));
};

export const selectors = {
  rulesState: (state) => state[SLICE],
};

export default rulesSlice.reducer;
