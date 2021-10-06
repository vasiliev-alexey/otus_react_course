import React, { Component } from 'react';
import Terminal from 'terminal-in-react';

class App extends Component {
  showMsg = () => 'Hello World';

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          //   width: '100%',
        }}
      >
        <Terminal
          color="green"
          backgroundColor="black"
          barColor="black"
          style={{ fontWeight: 'bold', fontSize: '1em', width: '600px' }}
          commands={{
            color: {
              options: [
                {
                  name: 'color',
                  description: 'The color the output should be',
                  defaultValue: 'white',
                },
              ],
            },
          }}
          // commands={{
          //   'open-google': () =>
          //     window.open('https://www.google.com/', '_blank'),
          //   showmsg: this.showMsg,
          //   popup: () => alert('Terminal in React'),
          // }}
          description={{
            'open-google': 'opens google.com',
            showmsg: 'shows a message',
            alert: 'alert',
            popup: 'alert',
          }}
          msg="Я Ваш калькулятор"
        />

        <Terminal
          commands={{
            'type-text': (
              args: any[],
              print: (arg0: string) => void,
              runCommand: (arg0: string) => void
            ) => {
              const text = args.slice(1).join(' ');
              print('');
              for (let i = 0; i < text.length; i += 1) {
                setTimeout(() => {
                  runCommand(`edit-line ${text.slice(0, i + 1)}`);
                }, 100 * i);
              }
            },
          }}
        />
      </div>
    );
  }
}

export default App;
