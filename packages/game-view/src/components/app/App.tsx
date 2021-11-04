import React, { Component } from 'react';
import Game from '../game/Game';
import Header from '../header/Header';
import Footer from '../footer/Footer';

class App extends Component {
  render(): React.ReactElement {
    return (
      <>
        <Header />
        <main>
          <Game />
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
