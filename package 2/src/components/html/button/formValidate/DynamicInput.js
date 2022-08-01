import PropTypes from 'prop-types'
import { Translate } from 'react-redux-i18n'
import { Input } from '../html/Input'
import { Span } from '../html/Span'
import style from './index.module.css'

export const DynamicInput = ({
  typeInput,
  nameInput,
  classContainer,
  classInput,
  classMessage,
  placeholder,
  disableInput,
  form,
  touchOnBlur,
  disableI18nMessage,
  elementMessageBefore,
  renderMessage,
  renderInput,
}) => {
  const valueInput = form.useValueInput(nameInput)
  const touchInput = form.useValueTouch(nameInput)
  const errorInput = form.useValueError(nameInput)
  const errorOneField = form.useErrorOneField(nameInput)

  const handleChangeValue = (e) => {
    form.changeValues(nameInput, e.target.value)
  }

  const handleTouch = () => {
    if (!touchInput) form.addTouch(nameInput, true)
  }

  return (
    <div className={classContainer}>
      {elementMessageBefore && touchInput && errorInput && (
        <>
          {renderMessage ? (
            renderMessage()
          ) : (
            <div className={`${classMessage} ${style.messageError}`}>
              {!disableI18nMessage ? (
                <Span style={{ fontSize: 9 }}>
                  <Translate value={errorInput} />
                </Span>
              ) : (
                <Span style={{ fontSize: 9 }}>{errorInput}</Span>
              )}
            </div>
          )}
        </>
      )}
      {renderInput ? (
        renderInput({ form, valueInput, touchInput, errorInput })
      ) : ['text', 'password'].includes(typeInput) ? (
        <Input
          value={valueInput || ''}
          onChange={handleChangeValue}
          onBlur={touchOnBlur ? handleTouch : undefined}
          placeholder={placeholder || ''}
          disabled={disableInput}
          className={`${classInput} ${
            (errorInput || errorOneField) && touchInput ? style.inputError : ''
          }`}
          type={typeInput}
        />
      ) : null}
      {!elementMessageBefore && touchInput && errorInput && (
        <>
          {renderMessage ? (
            renderMessage(errorInput)
          ) : (
            <div className={`${classMessage} ${style.messageError}`}>
              {!disableI18nMessage ? (
                <Span style={{ fontSize: 9 }}>
                  <Translate value={errorInput} />
                </Span>
              ) : (
                <Span style={{ fontSize: 9 }}>{errorInput}</Span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

DynamicInput.propTypes = {
  typeInput: PropTypes.string,
  nameInput: PropTypes.string.isRequired,
  classContainer: PropTypes.string,
  classInput: PropTypes.string,
  classMessage: PropTypes.string,
  placeholder: PropTypes.string,
  disableInput: PropTypes.bool,
  form: PropTypes.object.isRequired,
  touchOnBlur: PropTypes.bool,
  disableI18nMessage: PropTypes.bool,
  elementMessageBefore: PropTypes.bool,
  renderMessage: PropTypes.func,
  renderInput: PropTypes.func,
}

DynamicInput.defaultProps = {
  touchOnBlur: false,
  disableI18nMessage: false,
  elementMessageBefore: false,
  disableInput: false,
  typeInput: '',
  classContainer: '',
  classInput: '',
  classMessage: '',
  placeholder: '',
  renderMessage: null,
  renderInput: null,
}
