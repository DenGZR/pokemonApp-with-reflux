import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Details from './pages/details.jsx';
import NotFound from './pages/notFound.jsx';

// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const routes = (
    <Router history={appHistory}>
        <Route path='/' component={ App }>
            <IndexRoute component={ Home }/>
            <Route path='home' component={ Home }/>
            <Route path="details/:pokemonId" component={ Details }/>
        </Route>
        <Route path='*' component={NotFound}/>
    </Router>
);

export default routes;