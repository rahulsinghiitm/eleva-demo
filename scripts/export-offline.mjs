import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const bundle = readdirSync('build/assets').find(file => /^index-.*\.js$/.test(file));
if (!bundle) throw new Error('React bundle not found; run the Vite build first.');

const styles = ['styles.css', 'rewards.css', 'redemptions.css', 'onboarding.css']
  .map(file => readFileSync(`dist/${file}`, 'utf8').replaceAll('./assets/', './dist/assets/'))
  .join('\n');
const scripts = ['rewards.js', 'redemptions.js', 'onboarding.js', 'app.js']
  .map(file => `<script>${readFileSync(`dist/${file}`, 'utf8').replaceAll('./assets/', './dist/assets/').replaceAll('</script', '<\\/script')}</script>`)
  .join('\n');
const reactBundle = readFileSync(`build/assets/${bundle}`, 'utf8').replaceAll('</script', '<\\/script');

writeFileSync('open.html', `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#131613">
  <title>Eleva — Your wealth. Your credit.</title>
  <link rel="icon" href="./dist/assets/eleva.svg" type="image/svg+xml">
  <style>${styles}</style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <div id="app"></div>
  <div id="overlay-root"></div>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>
  ${scripts}
  <script type="module">${reactBundle}</script>
</body>
</html>`);
