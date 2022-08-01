import { useDispatch, useSelector } from 'react-redux'
import { changeData, selectData } from './store/slice'
export const Main = () => {
  // const [currentState, setCurrentState] = useState({ a: 1 })
  // console.log(currentState)
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(changeData({ name: 'abc' }))
    // setCurrentState({ a: 1 })
  }
  //khi dispathc nhan data moi thi useSelect se so sanh xem prevstate voi newstate co giong nhau khong, neu co thi se khong re render(doi voi kieu tham tri) vd: useSelect = 0 va dispath = 0 , con neu state la mot object thi no se luon luon re rerender vi moi lan dispath object giong nhau thi no se la 2 dia chi tham chieu khac nhau nen useSelector so sanh luon luon khac nhau vi vay se bi rerender VD: useSelect = {a : 1} dispathh = {a: 1} thi 2 cai obj la 2 cai dia chi khac nhau

  //Doi voi re render useState cung tuong tu
  // Doi voi props thi neu thang cha bi render thi thang con se cung bi rerender theo va phai dung memo de ghi nho va so sanh props, neu prevprops vs lan re-render cua thang cha giong nhau thi se k bi render
  // Con neu thang cha truyen mot func thi se phai dung useCallback hoac so sanh cua memo vi moi khi cha rerender no se tao ra moi truong moi va func duoc truyen cho thang con cung la func voi dia chi tham chieu khac
  const data = useSelector(selectData)
  console.log('render')
  return (
    <>
      {/* <div>{currentState}</div> */}
      <button onClick={onClick}>Clicked</button>
      {/* <Child data={0} /> */}
    </>
  )
}
