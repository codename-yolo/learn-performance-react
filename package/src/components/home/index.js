import { useDispatch } from 'react-redux'
import { updateTable } from './store/slice'
import { Table } from './table'

export const Home = () => {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(updateTable({ id: 1, name: 'abc', desc: 'abc' }))
  }
  return (
    <>
      <button onClick={onClick}>Update</button>
      <Table />
    </>
  )
}
