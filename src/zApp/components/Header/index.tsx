import React, { useMemo, memo } from 'react'
import { FC, PropsWithChildren } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { CommonAction } from '@/store/reducers'
import { AUTH } from '@/store/modules/auth/actionTypes'

import { useAuthLv } from '@/useDefinedHooks'
import { updateUserInfo, getUserInfo, clearUserInfo } from '@/utils/userInfo'

import Arrow from '@/components/Arrow'

import styles from './index.module.scss'
import avator from '@/assets/avator.png'
import { authList } from './authConfig'

interface HeaderProps extends RouteComponentProps {}

const Header: FC<HeaderProps> = (props: PropsWithChildren<HeaderProps>) => {
  const dispatch = useDispatch<Dispatch<CommonAction>>()
  
  // 用户等级权限
  const authLv = useAuthLv()

  // 用户信息
  const userInfo = useMemo(() => getUserInfo(), [])

  function logout() {
    // 清除用户信息
    clearUserInfo()

    // 卸载所有权限
    dispatch({ type: AUTH.UPDATE_AUTH_LV })

    props.history.push('/login')
  }

  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <h1>
          <Link className="logo" to="/home">
            营业部智慧经营平台
          </Link>
        </h1>
      </div>

      <div className={styles.actionArea}>
        {/* 某些功能 */}
        <button className={[styles.actionItem, styles.search].join(' ')}></button>
        <button className={[styles.actionItem, styles.upload].join(' ')}></button>
        <button className={[styles.actionItem, styles.set].join(' ')}></button>

        {/* 用户信息 */}
        <div className={styles.user}>
          {/* 头像 */}
          <div className={styles.avator}>
            <img src={avator} alt="" />
          </div>

          {/* 描述 */}
          <div className={styles.info}>
            <p>{userInfo.deptDesc}</p>
            <p>{userInfo.rankDesc}</p>
          </div>

          {/* 下拉菜单 */}
          <div className={styles.dropdown}>
            <ul>
              <li>
                <h5 className={styles.username}>李东游</h5>
              </li>
              <li>
                <div className={styles.changeAuth}>
                  <button>
                    <span>更改用户权限</span> <Arrow direction="right" />
                  </button>
                  <div className={styles.dropdown}>
                    <ul>
                      {authList.map((item, index) => (
                        <li
                          key={index}
                          className={item.authLv === authLv ? styles.authLvActived : ''}
                          onClick={() => {
                            updateUserInfo(item.authLv)
                            dispatch({ type: AUTH.UPDATE_AUTH_LV })
                          }}
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
              <li onClick={logout}>退出</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(withRouter(Header))
