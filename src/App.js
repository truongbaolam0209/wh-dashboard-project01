import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import PageDashboard from './layouts/PageDashboard';
import PageLogin from './layouts/PageLogin';


const App = () => {

   return (
      <BrowserRouter>
         <Switch>
            <Route path='/' component={PageDashboard} />
            <Route path='/login' component={PageLogin} />
         </Switch>
      </BrowserRouter>
   );
};

export default App;
