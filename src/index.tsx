// External Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { FirebaseApp } from 'firebase/app';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';

// Internal Imports
import { Home, Dashboard, SignIn, SignUp } from './components/index';
import './index.css';
import { theme } from './Theme/themes';
import { store } from './redux/store';
import { firebaseConfig } from './firebaseConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path='/' element={<Home title={'Character Inventory'}/>} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </FirebaseAppProvider>
    </React.StrictMode>,
  )
