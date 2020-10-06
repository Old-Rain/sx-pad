import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.css'
import './styles/index.scss'

import App from './zApp/App'
import * as serviceWorker from './serviceWorker'

console.log('东风吹散梁溪晚，运河不禁向北流')

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App />,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
