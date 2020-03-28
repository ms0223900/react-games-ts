import React from 'react';
import './App.css';
import { ContextWrapper } from 'constants/context';
import RoutePage from 'app/AnKa/containers/RoutePage';
import { ApolloWrapper } from 'app/AnKa/constants/API';
import BulletNote from 'app/BulletNote';
// import 'style/style.css';

const App: React.FC = () => {
  return (
    <>
      <BulletNote />
    </>
  );
};

export default App;
