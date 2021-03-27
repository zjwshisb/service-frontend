import React from "react";
import {Avatar} from "antd";

const Index: React.FC<{
  message: APP.Message
}> = props => {
  return React.useMemo(() => {
    return <div className='message-item' style={{flexDirection: 'row'}}>
      <div className='avatar'>
        <Avatar size={30} shape={"square"}>u</Avatar>
      </div>
      <div className='word'>
        aadwnadnwiandhiuanwi
      </div>
    </div>
  }, [])
}
export default Index
