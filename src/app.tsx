import React from 'react'
import { render } from 'react-dom'

import './index.html'
import './style.scss'

const App = () => <div>Hello, world!</div>

render(<App />, document.getElementById('app'))
