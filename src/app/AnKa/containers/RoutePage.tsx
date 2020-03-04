import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AnkaPostWithQuery } from '../components/AnkaPostsPage';
import { AnkaPageWithRouter } from '../components/AnkaPage';
import { ankaPage_mockData } from '../storage/mockData';
import { NavBarWithCtx } from '../components/log-and-sign/NavBar';

const RoutePage = () => {
  return (
    <Router>
      <Link to={'/posts'}>{'posts'}</Link>
      <NavBarWithCtx />
      <Switch>
        <Route exact path={'/posts'} component={AnkaPostWithQuery} />
        <Route path={'/posts/:id'} render={props => (
          <AnkaPageWithRouter
            {...props} 
            {...ankaPage_mockData}/>
        )} />
      </Switch>
    </Router>
    
  );
};

export default RoutePage;