import PropTypes from 'prop-types'
import { useEffect } from 'react'
import useForm from './useForm'
import ValidateForm from './ValidateForm'

export const Form = ({
  initialValues,
  schema,
  handleSubmitForm,
  children,
  onlyValidateInSubmit,
}) => {
  const form = useForm({
    initialValues,
  })

  useEffect(() => {
    return () => form.resetForm()
  }, [])

  return (
    <>
      {children(form)}
      <ValidateForm
        schema={schema}
        onlyValidateInSubmit={onlyValidateInSubmit}
        handleSubmitForm={handleSubmitForm}
      />
    </>
  )
}

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  handleSubmitForm: PropTypes.func,
  children: PropTypes.func.isRequired,
  onlyValidateInSubmit: PropTypes.bool,
}

Form.defaultProps = {
  handleSubmitForm: () => {},
  onlyValidateInSubmit: false,
}
