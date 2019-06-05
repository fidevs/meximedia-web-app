import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './containers/Home'
import Admin from './containers/Admin'
import Index from './containers/Index'

class App extends Component {
  render() {
    return (
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/index" component={Index} />
        </div>
    );
  }
}

export default App;
