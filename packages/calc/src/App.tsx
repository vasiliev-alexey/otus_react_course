import React, { Component } from 'react';
import Terminal from 'terminal-in-react';

import { runner } from './calc/runner';

class App extends Component {
  handler = (cmd: string | string[], print: (msg: string) => void): void => {
    let queryString = '';
    if (cmd instanceof Array) {
      queryString = cmd.join(' ');
    } else {
      queryString = cmd;
    }

    try {
      const rez = runner(queryString);
      print(`>   ${rez}`);
    } catch (e) {
      print(`>  + ${e}  ${queryString}`);
    }

    cmd = '';
  };

  render(): React.ReactElement {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Terminal commandPassThrough={this.handler} outputColor="red" />
      </div>
    );
  }
}

export default App;
