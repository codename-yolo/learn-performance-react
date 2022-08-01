import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decodeMessage } from './helper'
import {
  addErrors,
  addErrorsOneField,
  handleResetSubmit,
  resetErrors,
  selectAllValues,
  selectFormSubmit,
} from './slice'

const ValidateForm = ({ schema, onlyValidateInSubmit, handleSubmitForm }) => {
  const dispatch = useDispatch()

  const values = useSelector(selectAllValues)
  const valueSubmit = useSelector(selectFormSubmit)

  const handleValidate = () => {
    return schema.validate(values, { abortEarly: false }).then(
      (res) => {
        dispatch(resetErrors())
        return true
      },
      (err) => {
        const errors = {}
        const errorsOneField = {}
        err.errors.forEach((item) => {
          const { key, message, type } = decodeMessage(item)
          if (!type) errors[key] = message
          else errorsOneField[key] = { message, type }
        })
        dispatch(addErrors(errors))
        dispatch(addErrorsOneField(errorsOneField))
        return false
      },
    )
  }

  useEffect(() => {
    if (schema && !onlyValidateInSubmit) handleValidate()
  }, [values])

  useEffect(async () => {
    if (schema && valueSubmit) {
      const isNoError = await handleValidate()
      if (isNoError) {
        handleSubmitForm(valueSubmit)
        dispatch(handleResetSubmit())
      } else dispatch(handleResetSubmit())
    }
  }, [valueSubmit, dispatch])

  return <></>
}

export default ValidateForm
