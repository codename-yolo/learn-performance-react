import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'

function useOutside(ref, handleClickOutside, exceptRef, eventType) {
  useEffect(() => {
    function clickOutside(event) {
      const refs = Array.isArray(exceptRef)
        ? [...exceptRef, ref]
        : [exceptRef, ref]
      const conditions = []

      refs.forEach((itemRef) => {
        if (itemRef && itemRef.current) {
          conditions.push(itemRef.current)
        }
      })

      if (conditions.every((condition) => !condition.contains(event.target))) {
        handleClickOutside()
      }
    }
    document.addEventListener(eventType, clickOutside)
    return () => {
      document.removeEventListener(eventType, clickOutside)
    }
  }, [ref, handleClickOutside, eventType, exceptRef])
}

export const HandleClickOutside = ({
  children,
  handleClickOutside,
  exceptRef,
  eventType,
}) => {
  const wrapperRef = useRef(null)
  useOutside(wrapperRef, handleClickOutside, exceptRef, eventType)

  return <div ref={wrapperRef}>{children}</div>
}

HandleClickOutside.propTypes = {
  children: PropTypes.element.isRequired,
  handleClickOutside: PropTypes.func.isRequired,
  exceptRef: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  eventType: PropTypes.string,
}

HandleClickOutside.defaultProps = {
  exceptRef: null,
  eventType: 'mousedown',
}
