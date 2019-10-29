import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import AnkaPostsPage from '../components/AnkaPostsPage';
import AnkaPage from '../components/AnkaPage';
import { replies_mockData } from '../storage/mockData';

const RoutePage = () => {
  return (
    <Router>
      <Link to={'/posts'}>{'posts'}</Link>
      <Switch>
      
        <Route exact path={'/posts'} component={() => (
          <AnkaPostsPage queriedPosts={replies_mockData} />
        )} />
        <Route path={'/posts/:id'} component={AnkaPage} />
      </Switch>
    </Router>
    
  );
};

export default RoutePage;