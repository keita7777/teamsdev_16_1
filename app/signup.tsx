import React from 'react';
import Header from '../components/Header';
import SignUpForm from '../components/AuthForm/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={styles.container}>
        <SignUpForm />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
  }
};

export default SignUpPage;
