import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import ScreenHome from './screens/ScreenHome';
import ScreenLogin from './screens/ScreenLogin';
import ScreenMap from './screens/ScreenMap';
import ScreenConfirm from './screens/ScreenConfirm';
import ScreenDashboard from './screens/ScreenDashboard';
import ScreenBasket from './screens/ScreenBasket';
import ScreenFabricant from './screens/ScreenFabricant';
import ScreenProfil from './screens/ScreenProfil';

import userToken from './reducer/user';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ userToken }))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={ScreenHome} path="/" exact />
          <Route component={ScreenLogin} path="/screenlogin"/>
          <Route component={ScreenMap} path="/screenmap"/>
          <Route component={ScreenConfirm} path="/screenconfirm"/>
          <Route component={ScreenDashboard} path="/screendashboard"/>
          <Route component={ScreenBasket} path="/screenbasket"/>
          <Route component={ScreenFabricant} path="/screenfabricant"/>
          <Route component={ScreenProfil} path="/screenprofil"/>
        </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;