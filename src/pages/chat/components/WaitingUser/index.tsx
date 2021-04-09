import React from 'react'
import {UserAddOutlined} from "@ant-design/icons/lib";
import {Popover, List} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import styles from './index.less'

const Index = () => {
  const {waitingUsers} = useModel('useWaitingUserModel')
  // const {send} = useModel('useWebsocketModel')

  // const accept = React.useCallback((u: APP.WaitingUser) => {
  // }, [send])

  const list = <List<APP.WaitingUser> dataSource={waitingUsers} size={'small'} renderItem={item => {
    return <List.Item key={item.id}
                      actions={[<a>+</a>]}>
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
