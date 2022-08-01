import { createSelector, createSlice } from '@reduxjs/toolkit'
import reducerRegistry from '../../helpers/ReducerRegistry'

const slice = createSlice({
  name: 'main',
  initialState: {
    name: { name: 'thuan' },
    data: { name: 'abc' },
  },
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload
    },
    changeData: (state, action) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const selectData = createSelector(
  (state) => {
    return state[slice.name].data
  },
  (state) => {
    console.log(state)
    return state
  },
)
export const selectDataName = (state) => {
  return state[slice.name].name
}

export const selectName = createSelector(
  (state) => state[slice.name].name,
  (name) => name.name,
)
export const { changeName, changeData } = slice.actions
export const changeAsyncName = (name) => (dispatch, getState) => {
  dispatch(changeName(name))
}

reducerRegistry.register(slice.name, slice.reducer)
