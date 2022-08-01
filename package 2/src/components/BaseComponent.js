import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTranslations } from 'react-redux-i18n'

export const BaseComponent = ({ children, newLangData }) => {
  const dispatch = useDispatch()
  const langData = useSelector((state) => state.i18n.translations)

  useEffect(() => {
    const data = {}
    Object.keys(newLangData).forEach((locale) => {
      data[locale] = {
        ...langData[locale],
        ...newLangData[locale],
      }
    })
    dispatch(loadTranslations(data))
  }, [])

  return children
}

BaseComponent.propTypes = {
  children: PropTypes.node,
  newLangData: PropTypes.object,
}

BaseComponent.defaultProps = {
  newLangData: {},
}
