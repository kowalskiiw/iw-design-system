import soccerRaw from '../assets/sports/soccer.svg?raw';

function prep(svg, cls, key) {
  return svg
    .replace('<svg', `<svg class="${cls}"`)
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`);
}

function hotbet({ title, subtitle, odds }, i) {
  return `
    <div class="hotbets">
      ${prep(soccerRaw, 'hotbets__icon', `chb${i}`)}
      <div class="hotbets__body">
        <span class="hotbets__title">${title}</span>
        <span class="hotbets__subtitle">${subtitle}</span>
      </div>
      <div class="odds-simple">
        <span class="odds-simple__value">${odds}</span>
      </div>
    </div>`;
}

const ROWS = [
  { title: 'Olympique Lyon', subtitle: 'Ligue 1 · Lyon — Nice · Home win', odds: '1.50' },
  { title: 'Bayern München', subtitle: 'Bundesliga · Bayern — Dortmund · Over 2.5', odds: '1.75' },
  { title: 'Real Madrid', subtitle: 'La Liga · Real — Barça · Both to score', odds: '2.10' },
  { title: 'Inter Milano', subtitle: 'Serie A · Inter — Juventus · Home win', odds: '1.95' },
];

function renderCardHotbets() {
  return `
    <div class="card-hotbets">
      <div class="card-hotbets__header">
        <span class="card-hotbets__title">Hot bets</span>
        <span class="card-hotbets__pill"><span class="card-hotbets__pill-text">5 this week</span></span>
      </div>
      <div class="card-hotbets__rows">
        ${ROWS.map(hotbet).join('')}
      </div>
      <div class="card-hotbets__footer">
        <div class="card-hotbets__footer-info">
          <span class="card-hotbets__footer-label">2 selections · combi odds</span>
          <span class="card-hotbets__footer-odds">2.40</span>
        </div>
        <button class="button button--small">Add to betslip</button>
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Card Hotbets',
  render: () => renderCardHotbets(),
};

export const Default = {};

export const Overview = {
  render: () => `
    <div style="display:flex;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderCardHotbets()}
    </div>`,
};
