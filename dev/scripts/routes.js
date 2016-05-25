import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Details from './pages/details.jsx';
import NotFound from './pages/notFound.jsx';


const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={ App }>
            <IndexRoute component={ Home }/>
            <Route path="details/:pokemonId" component={ Details }/>
            <Route path='*' component={NotFound}/>
        </Route>
    </Router>
);

export default routes;