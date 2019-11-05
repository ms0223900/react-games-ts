import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, MemoryRouter } from 'react-router-dom';
import { Box } from '@material-ui/core';
import AnkaPostsPage, { AnkaPostWithQuery } from '../components/AnkaPostsPage';
import AnkaPage, { AnkaPageWithRouter } from '../components/AnkaPage';
import { replies_mockData, ankaPage_mockData } from '../storage/mockData';
import MultiUserPage from 'app/common-components/MultiUserPage';

const RoutePage = () => {
  return (
    <Router>
      <Link to={'/posts'}>{'posts'}</Link>
      <Switch>
      
        <Route exact path={'/posts'} component={() => (
          <AnkaPostWithQuery />
        )} />
        <Route path={'/posts/:id'} render={props => (
          <MultiUserPage>
            <AnkaPageWithRouter {...props} {...ankaPage_mockData}/>
          </MultiUserPage>
        )} />
      </Switch>
    </Router>
    
  );
};

export default RoutePage;