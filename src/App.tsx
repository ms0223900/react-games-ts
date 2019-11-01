import React from 'react';
import './App.css';
import GrouponForm from 'app/containers/grouponForm';
import { ContextWrapper } from 'constants/context';
import NavBar from 'app/common-components/NavBar';
import MultiUserPage from 'app/common-components/MultiUserPage';
import AnkaPage from 'app/AnKa/components/AnkaPage';
import { user03_host_mockData, replies_mockData } from 'app/AnKa/storage/mockData';
import RoutePage from 'app/AnKa/containers/RoutePage';
import { ApolloWrapper } from 'app/AnKa/constants/API';
// import 'style/style.css';

const App: React.FC = () => {
  return (
    <>
      <ApolloWrapper>
        <RoutePage />
      </ApolloWrapper>
    </>
  );
};

export default App;
