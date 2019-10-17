import React from 'react';
import './App.css';
import GrouponForm from 'app/containers/grouponForm';
import { ContextWrapper } from 'constants/context';
import NavBar from 'app/common-components/NavBar';
// import 'style/style.css';

const App: React.FC = () => {
  return (
    <>
      <ContextWrapper>
        <NavBar />
        <GrouponForm />
      </ContextWrapper>
    </>
  );
};

export default App;
