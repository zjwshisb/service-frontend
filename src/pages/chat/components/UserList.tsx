import React from "react";
import UserItem from './UserItem/index'
import {useModel} from "@@/plugin-model/useModel";

const Index: React.FC = () => {
  const users = useModel('useUsersModel')

  let userList = Array.from(users.users).map(v => {
    return v[1]
  })

  userList = userList.sort((a, b) => {
    if (a.online && !b.online) {
      return -1
    } if (a.online === b.online) {
      return 0
    }
    return 1
  })

  const list = userList.map(v => {
    return <UserItem user={v} key={v.id}/>
  })
  return <div className='user-list'>
    {
      list
    }
  </div>
}
export default Index
