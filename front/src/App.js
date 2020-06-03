import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import ScreenHome from './screens/ScreenHome';
import ScreenLogin from './screens/ScreenLogin';
import ScreenMap from './screens/ScreenMap';
import ScreenConfirm from './screens/ScreenConfirm';
import ScreenDashboard from './screens/ScreenDashboard';
import ScreenBasket from './screens/ScreenBasket';

function App() {
  return (

    <Router>
      <Switch>
        <Route component={ScreenHome} path="/" exact />
        <Route component={ScreenLogin} path="/screenlogin"/>
        <Route component={ScreenMap} path="/screenmap"/>
        <Route component={ScreenConfirm} path="/screenconfirm"/>
        <Route component={ScreenDashboard} path="/screendashboard"/>
        <Route component={ScreenBasket} path="/screenbasket"/>
      </Switch>
    </Router>
  );
}

export default App;