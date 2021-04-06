import React from "react";
import MessageItem from './MessageItem'
import {useModel} from "@@/plugin-model/useModel";

const Index: React.FC = () => {
  const {current} = useModel('useCurrentModel')
  const users = useModel('useUsersModel')
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (ref.current != null) {
      const {scrollHeight, clientHeight} = ref.current
      const maxScrollTop = scrollHeight - clientHeight
      ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  })
  return <div className='message-list' ref={ref}>
    {
      users.users.get(current)?.messages.map(v => {
        if (v.data.type === 'text') {
          return <MessageItem action={v}  key={v.req_id} />
        }
        return <></>
      })
    }
  </div>
}
export default Index
