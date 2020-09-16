import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

import styles from './index.module.scss'

interface HeaderProps extends RouteComponentProps {}

const Header: FC<HeaderProps> = (props: PropsWithChildren<HeaderProps>) => {
  return (
    <header className={styles.Header}>
      <button onClick={() => props.history.push('/login')}>logout</button>
    </header>
  )
}

export default withRouter(Header)
