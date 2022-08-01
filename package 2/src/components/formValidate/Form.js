import { useForm } from './useForm'
import { ValidateForm } from './ValidateForm'

export const Form = ({ children, schema, handleSubmitForm }) => {
  const form = useForm()
  return (
    <>
      {children(form)}
      <ValidateForm schema={schema} handleSubmitForm={handleSubmitForm} />
    </>
  )
}
