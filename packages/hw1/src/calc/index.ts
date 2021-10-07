import { createInterface } from 'readline';

import { runner } from './runner';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (): Promise<void> =>
  new Promise((resolve) => {
    rl.question('> ', (answer: string) => {
      const result = runner(answer);
      if (result) {
        console.log('> ', '\x1b[44m', `${result}`, '\x1b[0m');
      }
      resolve();
    });
  });

async function app(): Promise<null> {
  while (true) {
    await question();
  }
}

app().then(() => {
  console.log('finished');
});
