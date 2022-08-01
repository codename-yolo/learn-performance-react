import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decodeMessage } from './helper'
import {
  addErrors,
  resetError,
  resetSubmit,
  selectAllValues,
  selectSubmitted,
} from './slice'

export const ValidateForm = ({ schema, handleSubmitForm }) => {
  const dispatch = useDispatch()
  const values = useSelector(selectAllValues)
  const submitted = useSelector(selectSubmitted)

  useEffect(() => {
    handleValidate()
  }, [values])

  useEffect(() => {
    if (submitted) {
      handleValidate().then((res) => {
        dispatch(resetSubmit())
        if (res) {
          handleSubmitForm(values)
        }
      })
    }
  }, [submitted])

  const handleValidate = () => {
    return schema.validate(values, { abortEarly: false }).then(
      () => {
        dispatch(resetError())
        return true
      },
      (err) => {
        const errors = {}
        err.errors.forEach((item) => {
          const { name, message } = decodeMessage(item)
          errors[name] = message
        })
        dispatch(addErrors(errors))
        return false
      },
    )
  }

  return <></>
}
