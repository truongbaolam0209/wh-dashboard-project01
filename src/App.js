import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import PageDashboard from './Layouts/PageDashboard';
import PageSignIn from './Layouts/PageSignIn';


const App = () => {

   return (
      <BrowserRouter>
         <Switch>
            <Route path='/' component={PageDashboard} />
            <Route path='/signin' component={PageSignIn} />
            {/* <Route component={PageNotFound} /> */}
         </Switch>
      </BrowserRouter>
   );
};

export default App;
