import { cpSync, mkdirSync } from 'node:fs';

mkdirSync('public/legacy', { recursive: true });
for (const file of ['rewards.js', 'redemptions.js', 'app.js']) {
  cpSync(`dist/${file}`, `public/legacy/${file}`);
}
cpSync('dist/assets', 'public/assets', { recursive: true });
