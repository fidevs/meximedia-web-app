import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './containers/Home'
import Admin from './containers/Admin'
import PDV from './containers/PDV'

class App extends Component {
  render() {
    return (
        <div>
          <Route path="/index" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/pdv/:companyid" component={PDV} />
        </div>
    );
  }
}

export default App;
