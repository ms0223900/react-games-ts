import React from 'react';
import './App.css';
import { ContextWrapper } from 'constants/context';
import RoutePage from 'app/AnKa/containers/RoutePage';
import { ApolloWrapper } from 'app/AnKa/constants/API';
// import 'style/style.css';

const App: React.FC = () => {
  return (
    <>
      <ApolloWrapper>
        <ContextWrapper>
          <RoutePage />
        </ContextWrapper>
      </ApolloWrapper>
    </>
  );
};

export default App;
