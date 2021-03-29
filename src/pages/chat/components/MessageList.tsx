import React from "react";
import MessageItem from './MessageItem'
import {useModel} from "@@/plugin-model/useModel";

const Index: React.FC = () => {
  const current = useModel('useCurrentModel')
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (ref.current != null) {
      const {scrollHeight, clientHeight} = ref.current
      const maxScrollTop = scrollHeight - clientHeight
      ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  })
  return <div className='message-list' ref={ref}>
    {current.current?.messages.map(v => {
      if (v.type === 'text') {
        return <MessageItem message={v as APP.Message} key={Math.random() * 1000} />
      }
      return <></>
    })}
  </div>
}
export default Index
