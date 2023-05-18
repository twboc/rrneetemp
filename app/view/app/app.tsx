import React, {FC} from 'react'
import LeftNav from '../../component/leftNav/leftNav'

const App: FC = () => {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <LeftNav />
      <div style={{ clear: 'both'}}></div>
    </div>
  )
}

export default App
