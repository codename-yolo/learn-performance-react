import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

const ErrorOneField = ({ arrayValidate, children, form }) => {
  const errorOneField = form.useErrorsOneField()
  const allTouch = form.useValueAllTouch()

  const lastState = useRef({ errorOneField: {}, allTouch: {} })

  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    if (
      JSON.stringify(lastState.current) !==
      JSON.stringify({ errorOneField, allTouch })
    ) {
      const newErrorMessages = []
      const draftErrorOneFiled = { ...errorOneField }

      Object.keys(draftErrorOneFiled).forEach((key) => {
        if (!allTouch[key]) delete draftErrorOneFiled[key]
      })

      arrayValidate.forEach((item) => {
        if (
          item.field.every((subItem) => {
            return draftErrorOneFiled[subItem]?.type === item.type
          })
        ) {
          newErrorMessages.push(item.message)
          item.field.forEach((subItem) => {
            delete draftErrorOneFiled[subItem]
          })
        }
      })

      Object.keys(draftErrorOneFiled).forEach((key) => {
        newErrorMessages.push(draftErrorOneFiled[key].message)
      })

      setErrorMessages(newErrorMessages)
    }
    lastState.current = { errorOneField, allTouch }
  }, [errorOneField, allTouch])

  return <>{children(errorMessages)}</>
}

ErrorOneField.propTypes = {
  arrayValidate: PropTypes.array,
  children: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
}

ErrorOneField.defaultProps = {
  arrayValidate: [],
}

export default ErrorOneField
