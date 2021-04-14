import React from "react";
import {Avatar, Badge} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import lodash from 'lodash'
import LastTime from './components/LastTime'
import LastMessage from './components/LastMessage'
import Remove from './components/Remove'

const Index: React.FC<{
  user: APP.User
}> = (props) => {

  const {setCurrent, current} = useModel("useCurrentModel")
  const {setUsers} = useModel("useUsersModel")

  const onClick = React.useCallback(() => {
    setCurrent(props.user.id)
    setUsers(prevState => {
      const newState = lodash.cloneDeep(prevState)
      const u = newState.get(props.user.id)
      if (u) {
        u.unread = 0
      }
      return newState
    })
  }, [props.user.id, setCurrent, setUsers])

  const {length} = props.user.messages


  const lastMessage: APP.Message | undefined = length > 0 ? props.user.messages[length - 1] : undefined


  return <div className={current === props.user.id ? 'user-item active': 'user-item'} onClick={onClick}>
    <div className='avatar'>
      <Badge count={props.user.unread} size={"small"}>
        <Avatar size={50} shape='square'>
          {props.user.username}
        </Avatar>
      </Badge>
    </div>
    <div className='info'>
      <div className='first'>
        <div className={props.user.online ? 'name online':'name offline'}>
          {props.user.username}
        </div>
        <div className='time'>
          {lastMessage && <LastTime time={lastMessage.received_at} />}
        </div>
      </div>
      <div className='last'>
        <div className='message' >
          {lastMessage && <LastMessage message={lastMessage}/> }
        </div>
        <div className='action'>
          <Remove user={props.user} />
        </div>
      </div>
    </div>
  </div>
}
export default Index
