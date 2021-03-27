import React from "react";
import UserItem from './UserItem'
import {useModel} from "@@/plugin-model/useModel";

const Index: React.FC = () => {
  const users = useModel('useUsersModel')
  return <div className='user-list'>
    {
      users.users.map(v => {
        return <UserItem user={v} key={v.id}/>
      })
    }
  </div>
}
export default Index
