import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

/* Wait (up to 1.5 s) for the web fonts before the first render, so the headline animation and the 3D intro
   never start on fallback fonts and then jump when the real ones arrive. */
const fontsReady = Promise.race([
  Promise.all([
    document.fonts.load('700 1em Syne'),
    document.fonts.load('italic 1em "Instrument Serif"'),
    document.fonts.load('400 1em Geist'),
    document.fonts.load('400 1em "Geist Mono"')
  ]).catch(() => undefined),
  new Promise(r => setTimeout(r, 1500))
]);

fontsReady.then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
