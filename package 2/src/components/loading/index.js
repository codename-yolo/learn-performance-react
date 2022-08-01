import React from 'react'
import { Z_INDEX } from '../../constants/Common'
import style from './index.module.css'
import LoadingImage from './loading.gif'

export const Loading = () => {
  return (
    <div className={style.loadingSpinner} style={{ zIndex: Z_INDEX.LOADING }}>
      <img alt="loading" src={LoadingImage} />
    </div>
  )
}
