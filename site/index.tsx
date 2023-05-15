import * as React from 'react'
import {createRoot} from 'react-dom/client'
import './style/index.scss'
import Root from './view/root/root'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<Root />)
