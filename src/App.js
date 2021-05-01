import React from 'react'

import Home from './routes/Home'
import Intermediate from './routes/Intermediate'
import LoggedIn from './routes/LoggedIn'
import NotFound from './routes/NotFound'

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <div>
        <h1>runviz</h1>
        <Link to="/">Home</Link>
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
