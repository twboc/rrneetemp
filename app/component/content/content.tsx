import React, { FC } from 'react'
import './content.scss'

interface ContentProps {
    children: React.ReactNode
}

const Content: FC<ContentProps> = (props) => {
  return <div className='content'>
    {props.children}
  </div>
}
 
export default Content
