import test from 'ava';
import { transformFileSync } from 'babel-core';

test(t => {
  const { code } = transformFileSync('./main.js', {
    babelrc: false,
    plugins: ['./index.js']
  });
  t.snapshot(code);
});
