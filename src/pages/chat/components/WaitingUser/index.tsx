import React from 'react'
import {UserAddOutlined} from "@ant-design/icons/lib";
import {Popover, List} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import styles from './index.less'
import { handleAccept } from "@/services";
import {message} from "antd";
import lodash from 'lodash'

const Index = () => {

  const {waitingUsers} = useModel('useWaitingUserModel')
  const {setUsers} = useModel("useUsersModel")

  const accept = React.useCallback((id: number) => {
    handleAccept(id).then(res => {
      setUsers(prevState => {
        const newState = lodash.cloneDeep(prevState)
        newState.set(id, res.data)
        return newState
      })
      message.success('接入成功').then()
    }).catch(err => {
      message.error(err.data.message).then()
    })
  }, [setUsers])

  const list = <List<APP.WaitingUser> dataSource={waitingUsers} size={'small'} renderItem={item => {
    return <List.Item key={item.id}
                      actions={[<a onClick={() => accept(item.id)}>+</a>]}>
      <List.Item.Meta
        title={<span>{item.username}</span>}
      />
    </List.Item>
  }}/>
  return <div className={styles.index}>
    <Popover trigger={"click"} placement="right" content={<div className={styles.content}>{list}</div>}>
      <span className={styles.count}>{waitingUsers.length}</span><UserAddOutlined/>
    </Popover>
  </div>
}
export default Index
