import React, { Component } from 'react';
import Frame from '../frame/Frame';

class App extends Component {
  render(): React.ReactElement {
    return (
      <>
        <header>
          <div> toolbar</div>
        </header>
        <main>
          <Frame />
        </main>
        <footer>license</footer>
      </>
    );
  }
}

export default App;
