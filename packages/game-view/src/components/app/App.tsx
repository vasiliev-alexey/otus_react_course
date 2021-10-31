import React, { Component } from 'react';
import Frame from '../frame/Frame';
import Header from '../header/Header';
import Footer from '../footer/Footer';

class App extends Component {
  render(): React.ReactElement {
    return (
      <>
        <Header />
        <main>
          <Frame />
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
