import React from "react";
import UserItem from './UserItem'
import {useModel} from "@@/plugin-model/useModel";

const Index: React.FC = () => {
  const users = useModel('useUsersModel')
  const list = Array.from(users.users).map(v => {
    return <UserItem user={v[1]} key={v[1].id}/>
  })
  return <div className='user-list'>
    {
      list
    }
  </div>
}
export default Index
