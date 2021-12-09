import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';

import '../../../public/index.scss';
import AppRouter from '../appRouter/AppRouter';
import { GlobalContextProvider } from '../../context';

class App extends Component {
  render(): React.ReactElement {
    return (
      <GlobalContextProvider>
        <Router>
          <Header />

          <div className="bg" />
          <main>
            <AppRouter />
          </main>
          <Footer />
        </Router>
      </GlobalContextProvider>
    );
  }
}

export default App;
