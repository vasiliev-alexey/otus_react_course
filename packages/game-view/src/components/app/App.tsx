import '@css/index.scss';

import { store } from '@store/store';
import Footer from '@ui/footer/Footer';
import Header from '@ui/header/Header';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import AppRouter from '../appRouter/AppRouter';

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
