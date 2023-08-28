import React from 'react'
import Header from '../Header'

const ParentLayout = ({children}) => {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default ParentLayout