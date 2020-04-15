import React from 'react';
import './App.css';
import { ContextWrapper } from 'constants/context';
import RoutePage from 'app/AnKa/containers/RoutePage';
import { ApolloWrapper } from 'app/AnKa/constants/API';
import BulletNote from 'app/BulletNote';
import authorizeAndReadSheet from 'testGoogleSheetApiFiles/testGoogleSheetAPI';
import testReading from 'testGoogleSheetApiFiles/testReading';
import testWriting from 'testGoogleSheetApiFiles/testWriting';
// import 'style/style.css';

const App: React.FC = () => {
  React.useEffect(() => {
    (async function() {
      const res = await testReading();
      const writingRes = await testWriting();
      console.log(res, writingRes);
    }());
  });
  
  return (
    <>
      <BulletNote />
    </>
  );
};

export default App;
