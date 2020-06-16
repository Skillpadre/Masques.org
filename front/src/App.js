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
import ScreenContact from './screens/ScreenContact'
import ScreenQuiSommesNous from './screens/ScreenQuiSommeNous'
import ScreenActualité from './screens/ScreenActualité'
import ScreenError404 from './screens/ScreenError404'


import user from './reducer/user';
import basket from './reducer/order';
import quantity from './reducer/stock';
import confirm from './reducer/confirm';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ user, basket, quantity, confirm }))

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
          <Route component={ScreenQuiSommesNous} path="/quisommesnous"/>
          <Route component={ScreenActualité} path="/actualités"/>
          <Route component={ScreenError404} path="*"/> {/* LAISSER EN DERNIERE ROUTE */}
        </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;