import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import ScreenHome from './screens/ScreenHome';
import ScreenLogin from './screens/ScreenLogin';
import ScreenMap from './screens/ScreenMap';
import ScreenConfirm from './screens/ScreenConfirm';

function App() {
  return (

    <Router>
      <Switch>
        <Route component={ScreenHome} path="/" exact />
        <Route component={ScreenLogin} path="/screenlogin"/>
        <Route component={ScreenMap} path="/screenmap"/>
        <Route component={ScreenConfirm} path="/screenconfirm"/>
      </Switch>
    </Router>
  );
}

export default App;