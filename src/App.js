import React from 'react'

import Home from './components/Home'
import Intermediate from './components/Intermediate'
import LoggedIn from './components/LoggedIn'
import NotFound from './components/NotFound'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <div>
        <h1>runviz</h1>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/intermediate' component={Intermediate} />
          <Route path='/loggedin' component={LoggedIn} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
