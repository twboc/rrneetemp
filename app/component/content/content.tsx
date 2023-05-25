import React, {FC} from 'react'
import './content.scss'
import ContentProps from './content.type'

const Content: FC<ContentProps> = props => {
  return <div className="content">{props.children}</div>
}

export default Content
