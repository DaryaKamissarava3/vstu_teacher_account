import React from 'react';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <Header />
      <main className="auth-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};
