import { useSelector } from 'react-redux'
import { selectUserIds } from '../store/slice'
import { Row } from './Row'

export const Table = () => {
  const ids = useSelector(selectUserIds)
  console.log('render table')
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {ids.map((id) => {
          return <Row key={id} id={id} />
        })}
      </tbody>
    </table>
  )
}
