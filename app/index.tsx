import * as React from 'react'
import {createRoot} from 'react-dom/client'
import './style/index.scss'
import Root from './view/root/root'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<Root />)
