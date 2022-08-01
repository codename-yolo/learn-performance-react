import { createSlice } from '@reduxjs/toolkit'
import reducerRegister from '../../helpers/ReducerRegister'

const slice = createSlice({
  name: 'home',
  initialState: {
    userIds: [1, 2, 3],
    userById: {
      1: {
        id: 1,
        name: 'thuan1',
        desc: 'abc',
      },
      2: {
        id: 2,
        name: 'thuan2',
        desc: 'abc',
      },
      3: {
        id: 3,
        name: 'thuan2',
        desc: 'abc',
      },
    },
  },
  reducers: {
    updateTable: (state, action) => {
      const user = action.payload
      state.userById = {
        ...state.userById,
        [user.id]: user,
      }
    },
  },
})

export const selectUserIds = (state) => state[slice.name].userIds
export const selectUser = (rowId) => (state) =>
  state[slice.name].userById[rowId]

export const { updateTable } = slice.actions

reducerRegister.register(slice.name, slice.reducer)
