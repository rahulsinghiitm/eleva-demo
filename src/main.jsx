import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import '../dist/styles.css';
import '../dist/rewards.css';
import '../dist/redemptions.css';
import { ElevaApp } from './ElevaApp.jsx';

window.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('app'));
  window.elevaRender = () => {
    flushSync(() => root.render(<ElevaApp view={window.elevaView()} />));
  };
  window.elevaRender();
});
