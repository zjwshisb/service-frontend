import React from "react";
import {Avatar} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons/lib";

const Index: React.FC<{
  message: APP.Message,
  success: boolean
}> = props => {
  return React.useMemo(() => {
    return <div className={props.message.is_server ? 'message-item right': 'message-item'}>
      <div className='avatar'>
        <Avatar size={30} shape={"square"}>u</Avatar>
      </div>
      <div className='word'>
        {props.message.content}
      </div>
      {
        !props.success && <InfoCircleOutlined className={"error"}/>
      }
    </div>
  }, [props.message.content, props.message.is_server, props.success])
}
export default Index
