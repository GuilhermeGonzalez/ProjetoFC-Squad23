import React from 'react';
import { ModalProvider } from './hooks/useModal/modalContext';

import Routes from './routes';

import './styles/global.css';

export default function App() {
  return (
    <div className="App">
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </div>
  );
}