import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <NotificationProvider>
            <HashRouter>
              <AppRoutes />
            </HashRouter>
          </NotificationProvider>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
