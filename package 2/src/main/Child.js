import React from 'react'
import { useDispatch } from 'react-redux'
import { changeName } from './store/slice'

export const Child = React.memo(
  ({ data }) => {
    // const names = useSelector(selectData)
    const dispatch = useDispatch()
    console.log('render Child', data)
    const handleClick = () => {
      dispatch(changeName({ name: 'thuan' }))
    }
    return (
      <>
        <button onClick={handleClick}>Click me ne</button>
      </>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.data.name === nextProps.data.name
  },
)
