import React from "react";
import {Avatar, Badge, Modal} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import lodash from 'lodash'
import { removeUser } from "@/services";
import {DeleteOutlined } from "@ant-design/icons/lib";

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

  const handleDelete = React.useCallback((user: APP.User) => {
    if (user.disabled)
    removeUser(user.id).then(() => {
      setUsers(prevState => {
        const newState = lodash.cloneDeep(prevState)
        newState.delete(user.id)
        return newState
      })
    })
  }, [setUsers])

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
        <div className='name'>
          {props.user.username}
        </div>
        <div className='time'>
          20:10
        </div>
      </div>
      <div className='last'>
        <div className='message' >
        </div>
        <div className='action'>
          <DeleteOutlined style={{color: 'red'}} onClick={() => handleDelete(props.user)}/>
        </div>
      </div>
    </div>
  </div>
}
export default Index
