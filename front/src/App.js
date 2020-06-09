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
import ScreenMask from './screens/ScreenMask';
import Footer from './screens/Footer';
import ScreenContact from './screens/ScreenContact'
import ScreenAPropos from './screens/ScreenAPropos'
import Error404 from './Error404'

import user from './reducer/user';
import basketList from './reducer/order';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ user, basketList }))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={ScreenHome} path="/" exact />
          <Route component={ScreenLogin} path="/login"/>
          <Route component={ScreenMap} path="/map"/>
          <Route component={ScreenConfirm} path="/confirm"/>
          <Route component={ScreenDashboard} path="/dashboard/"/>
          <Route component={ScreenBasket} path="/basket"/>
          <Route component={ScreenFabricant} path="/fabricant/:id"/>
          <Route component={ScreenProfil} path="/profil"/>
          <Route component={ScreenMask} path="/mask"/>
          <Route component={ScreenContact} path="/contact"/>
          <Route component={ScreenAPropos} path="/apropos"/>
          <Route component={Error404} path="*"/> {/* LAISSER EN DERNIERE ROUTE */}
        </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;