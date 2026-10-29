import { readFileSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';

const read = file => readFileSync(file, 'utf8');
const escapeScript = source => source.replaceAll('</script', '<\\/script');

async function bundle(entry) {
  const result = await build({
    entryPoints: [entry],
    outdir: 'offline-bundle',
    bundle: true,
    format: 'iife',
    platform: 'browser',
    jsx: 'automatic',
    target: 'es2020',
    external: ['*.png'],
    write: false,
  });
  return {
    js: result.outputFiles.find(file => file.path.endsWith('.js')).text,
    css: result.outputFiles.find(file => file.path.endsWith('.css'))?.text ?? '',
  };
}

const appBundle = await bundle('src/main.jsx');
const appStyles = ['dist/styles.css', 'dist/rewards.css', 'dist/redemptions.css', 'src/onboarding-link.css']
  .map(file => read(file).replaceAll('./assets/', './dist/assets/'))
  .join('\n');
const legacyScripts = ['rewards.js', 'redemptions.js', 'app.js']
  .map(file => `<script>${escapeScript(read(`dist/${file}`).replaceAll('./assets/', './dist/assets/'))}</script>`)
  .join('\n');

writeFileSync('open.html', `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#131613">
  <title>Eleva — Your wealth. Your credit.</title>
  <link rel="icon" href="./dist/assets/eleva.svg" type="image/svg+xml">
  <style>${appStyles}</style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <div id="app"></div>
  <div id="overlay-root"></div>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>
  ${legacyScripts}
  <script>${escapeScript(appBundle.js)}</script>
</body>
</html>`);

const onboardingBundle = await bundle('src/onboarding/main.tsx');
writeFileSync('onboarding-offline.html', `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#231f20">
  <title>Eleva — Card onboarding</title>
  <style>${onboardingBundle.css}</style>
</head>
<body>
  <div id="root"></div>
  <script>${escapeScript(onboardingBundle.js)}</script>
</body>
</html>`);
