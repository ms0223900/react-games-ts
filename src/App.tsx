import React from 'react';
import './App.css';
import GrouponForm from 'app/containers/grouponForm';
import { ContextWrapper } from 'constants/context';
import NavBar from 'app/common-components/NavBar';
import MultiUserPage from 'app/common-components/MultiUserPage';
import AnkaPage from 'app/AnKa/components/AnkaPage';
import { user03_host_mockData, replies_mockData } from 'app/AnKa/storage/mockData';
// import 'style/style.css';

const App: React.FC = () => {
  return (
    <>
      <MultiUserPage>
        <AnkaPage 
          ankaPageId={'1'}
          ankaHostId={user03_host_mockData.id}
          queriedMessages={replies_mockData} 
        />
      </MultiUserPage>
    </>
  );
};

export default App;
