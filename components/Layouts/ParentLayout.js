import React from 'react'
import Header from '../Header'
import SideBar from '../SideBar'

const ParentLayout = ({children}) => {
  return (
    <div>
        <Header/>
        <SideBar/>
        {children}
    </div>
  )
}

export default ParentLayout