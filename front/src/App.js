import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import ScreenHome from './screens/ScreenHome';
import ScreenLogin from './screens/ScreenLogin';
import ScreenMap from './screens/ScreenMap';

function App() {
  return (

    <Router>
      <Switch>
        <Route component={ScreenHome} path="/" exact />
        <Route component={ScreenLogin} path="/screenlogin"/>
        <Route component={ScreenMap} path="/screenmap"/>
      </Switch>
    </Router>
  );
}

export default App;