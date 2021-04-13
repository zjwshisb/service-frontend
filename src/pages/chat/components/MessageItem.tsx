import React from "react";
import {Avatar, Spin} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons/lib";

const Index: React.FC<{
  action: APP.Action,
}> = props => {


  return React.useMemo(() => {
    return <div className={props.action.data.is_server ? 'message-item right': 'message-item'}>
      <div className='avatar'>
        <Avatar size={30} shape={"square"}>u</Avatar>
      </div>
      <div className='word'>
        {props.action.data.content}
      </div>
      {
        props.action.data.is_server ? <>
          {
            props.action.is_success === undefined && <Spin />
          }
          {
            props.action.is_success === false && <InfoCircleOutlined className={"error"}/>
          }
        </> : <></>
      }
    </div>
  }, [props.action.data.content, props.action.data.is_server, props.action.is_success])
}
export default Index
