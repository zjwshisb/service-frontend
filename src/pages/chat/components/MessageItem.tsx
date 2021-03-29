import React from "react";
import {Avatar} from "antd";
import {useModel} from "@@/plugin-model/useModel";

const Index: React.FC<{
  message: APP.Message
}> = props => {
  const user = useModel('@@initialState', model => model.initialState?.currentUser)
  return React.useMemo(() => {
    return <div className={props.message.is_server ? 'message-item right': 'message-item'}>
      <div className='avatar'>
        <Avatar size={30} shape={"square"}>u</Avatar>
      </div>
      <div className='word'>
        {props.message.content}
      </div>
    </div>
  }, [props.message.content, props.message.id, user?.id])
}
export default Index
