import { useDispatch, useSelector } from 'react-redux'
import { changeValue, selectError, selectValue } from './slice'

export const DynamicInput = ({ type, name }) => {
  const dispatch = useDispatch()
  const value = useSelector(selectValue(name))
  const error = useSelector(selectError(name))

  const onChange = (e) => {
    dispatch(changeValue({ name, value: e.target.value }))
  }

  return (
    <>
      <input type={type} onChange={onChange} value={value || ''} />
      <div>{error}</div>
    </>
  )
}
