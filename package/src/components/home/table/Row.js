import { useSelector } from 'react-redux'
import { selectUser } from '../store/slice'

export const Row = ({ id }) => {
  const rowData = useSelector(selectUser(id))
  console.log('render row');
  return (
    <tr>
      <td>{rowData.id}</td>
      <td>{rowData.name}</td>
      <td>{rowData.desc}</td>
    </tr>
  )
}
