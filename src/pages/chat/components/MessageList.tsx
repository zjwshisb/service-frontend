import React from "react";
import MessageItem from './MessageItem'
import {useModel} from "@@/plugin-model/useModel";

const Index: React.FC = () => {
  const current = useModel('useCurrentModel')
  return <div className='message-list'>
    {current.current?.messages.map(v => {
      return <MessageItem message={v} />
    })}
  </div>
}
export default Index
