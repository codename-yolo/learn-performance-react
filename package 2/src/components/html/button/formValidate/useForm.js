import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addError,
  addTouch,
  changeValues,
  handleSubmit,
  resetForm,
  selectAllTouch,
  selectAllValues,
  selectErrorOneField,
  selectErrorsOneField,
  selectFormError,
  selectFormSubmit,
  selectFormTouch,
  selectFormValue,
  setInitialValues,
} from './slice'

const useForm = ({ initialValues }) => {
  const dispatch = useDispatch()

  const valueSubmit = useSelector(selectFormSubmit)

  useEffect(() => {
    dispatch(setInitialValues(initialValues))
  }, [dispatch, initialValues])

  return {
    initialValues,
    isSubmiting: valueSubmit !== null,
    handleSubmit: () => {
      dispatch(handleSubmit())
    },
    changeValues: (name, value) => dispatch(changeValues({ name, value })),
    addTouch: (name, touch) => dispatch(addTouch({ name, touch })),
    addError: (name, error) => dispatch(addError({ name, error })),
    useValueInput: (name) => {
      return useSelector(selectFormValue(name))
    },
    useValueTouch: (touch) => {
      return useSelector(selectFormTouch(touch))
    },
    useValueError: (error) => {
      return useSelector(selectFormError(error))
    },
    useErrorOneField: (error) => {
      return useSelector(selectErrorOneField(error))
    },
    useErrorsOneField: () => {
      return useSelector(selectErrorsOneField)
    },
    useValueAllTouch: () => {
      return useSelector(selectAllTouch)
    },
    resetForm: () => dispatch(resetForm()),
    useValueAll: () => {
      return useSelector(selectAllValues)
    },
  }
}

export default useForm
