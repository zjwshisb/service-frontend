import React from "react";
import './index.less'
import Bar from './components/Bar'
import Input from './components/Input'
import UserList from './components/UserList'
import MessageList from './components/MessageList'
import {useModel} from "umi"

const Index: React.FC = () => {

  const {connect} = useModel('useWebsocketModel')


  React.useEffect(() => {
    connect()
  }, [connect])

  return <div className='chat-container'>
    <div className='chat'>
      <div className='title'>
      </div>
      <div className='body'>
        <UserList />
        <div className='message'>
          <MessageList />
          <Bar />
          <Input />
        </div>
      </div>
    </div>
  </div>
}
export default Index
