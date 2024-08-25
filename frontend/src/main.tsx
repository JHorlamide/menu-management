import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
)
