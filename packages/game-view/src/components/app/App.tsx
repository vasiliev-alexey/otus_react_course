import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from '@ui/header/Header';
import Footer from '@ui/footer/Footer';

import '@css/index.scss';
import AppRouter from '../appRouter/AppRouter';

import { store } from '@store/store';
import { Provider } from 'react-redux';

class App extends Component {
  render(): React.ReactElement {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <div className="bg" />
          <main>
            <AppRouter />
          </main>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
