import { useDispatch } from 'react-redux'
import { handleSubmit } from './slice'

export const useForm = () => {
  const dispatch = useDispatch()

  return {
    handleSubmit: () => {
      dispatch(handleSubmit())
    },
  }
}
