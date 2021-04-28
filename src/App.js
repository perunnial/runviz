import React from 'react'

import Home from './Home'
import Redirect from './Redirect'
import LoggedIn from './LoggedIn'
import NotFound from './NotFound'

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <div>
        <h1>runviz</h1>
        <Link to="/">Home</Link>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/redirect' component={Redirect} />
          <Route path='/loggedin' component={LoggedIn} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
