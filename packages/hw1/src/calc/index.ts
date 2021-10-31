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
        // eslint-disable-next-line no-console
        console.log('> ', '\x1b[44m', `${result}`, '\x1b[0m');
      }
      resolve();
    });
  });

async function app(): Promise<void> {
  while (true) {
    await question();
  }
}

app().then(() => {
  // eslint-disable-next-line no-console
  console.log('finished');
});
