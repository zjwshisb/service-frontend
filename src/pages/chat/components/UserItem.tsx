import React from "react";
import {Avatar, Badge} from "antd";
import {useModel} from "@@/plugin-model/useModel";

const Index: React.FC<{
  user: APP.User
}> = (props) => {
  const {setCurrent, current} = useModel("useCurrentModel")
  return <div className={current === props.user.id ? 'user-item active': 'user-item'} onClick={() => setCurrent(props.user.id)}>
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
      </div>
    </div>
  </div>
}
export default Index
