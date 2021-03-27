import React from "react";
import {Avatar} from "antd";
import {useModel} from "@@/plugin-model/useModel";

const Index: React.FC<{
  user: APP.User
}> = (props) => {
  const {setCurrent} = useModel("useCurrentModel")
  return <div className='user-item' onClick={() => setCurrent(props.user)}>
    <div className='avatar'>
      <Avatar size={50} shape='square'>
        {props.user.name}
      </Avatar>
    </div>
    <div className='info'>
      <div className='first'>
        <div className='name'>
          {props.user.name}
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
