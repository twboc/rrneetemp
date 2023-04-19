import React, {FC} from 'react'
import withNavigation from '../../template/withNavigation/withNavigation'

const Main: FC = () => {
  return (
    <div style={{margin: 'auto', maxWidth: '650px'}}>
      <h1>React, React Native, Electron and Express boilerplate</h1>
      <br />
      <h2>
        This boilerpate is minimal and includes only bare minimum to start
        developing a cross platform app.
      </h2>
      <br />
      <p>I hope this will be useful for you.</p>
    </div>
  )
}

export {Main}

export default withNavigation(Main)
