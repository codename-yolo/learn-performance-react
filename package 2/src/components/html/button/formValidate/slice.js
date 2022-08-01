import { createSlice } from '@reduxjs/toolkit'
import { register } from './../../utils/ReducerRegistry'

const initialState = {
  values: {},
  errors: {},
  errorsOneField: {},
  touches: {},
  valueSubmit: null,
}

const slice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setInitialValues: (state, action) => {
      state.values = action.payload
    },
    changeValues: (state, action) => {
      state.values[action.payload.name] = action.payload.value
    },
    addError: (state, action) => {
      state.errors[action.payload.name] = action.payload.error
    },
    handleSubmit(state) {
      Object.keys(state.values).forEach((key) => {
        state.touches[key] = true
      })
      state.valueSubmit = { ...state.values }
    },
    handleResetSubmit(state) {
      state.valueSubmit = null
    },
    addTouch(state, action) {
      state.touches[action.payload.name] = action.payload.touch
    },
    addErrors(state, action) {
      state.errors = action.payload
    },
    addErrorsOneField(state, action) {
      state.errorsOneField = action.payload
    },
    resetErrors(state) {
      state.errors = {}
      state.errorsOneField = {}
    },
    resetForm(state) {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key]
      })
    },
  },
})

export const {
  setInitialValues,
  changeValues,
  addTouch,
  addError,
  addErrors,
  addErrorsOneField,
  resetErrors,
  handleSubmit,
  resetForm,
  handleResetSubmit,
} = slice.actions

export const selectFormValue = (name) => (state) => state.form.values[name]
export const selectFormTouch = (touch) => (state) => state.form.touches[touch]
export const selectAllTouch = (state) => state.form.touches
export const selectFormError = (error) => (state) => state.form.errors[error]
export const selectErrorOneField = (error) => (state) =>
  state.form.errorsOneField[error]?.message
export const selectErrorsOneField = (state) => state.form.errorsOneField
export const selectFormSubmit = (state) => state.form.valueSubmit
export const selectSchema = (state) => state.form.schema
export const selectAllValues = (state) => state.form.values

register(slice.name, slice.reducer)
