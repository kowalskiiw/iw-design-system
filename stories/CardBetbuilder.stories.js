import soccerRaw from '../assets/sports/soccer.svg?raw';

const SOCCER = soccerRaw
  .replace('<svg', '<svg class="card-betbuilder__title-icon"')
  .replace(/id="([^"]+)"/g, 'id="cbb-$1"')
  .replace(/url\(#([^)]+)\)/g, 'url(#cbb-$1)');

function renderCard({ match, odds, selections }) {
  const rows = selections.map(([label, value]) => `
    <div class="card-betbuilder__selection">
      <span class="card-betbuilder__dot"></span>
      <span class="card-betbuilder__selection-text">${label} — <strong>${value}</strong></span>
    </div>`).join('');

  return `
    <div class="card-betbuilder">
      <div class="card-betbuilder__header">
        <div class="card-betbuilder__title">
          ${SOCCER}
          <span class="card-betbuilder__title-text">${match}</span>
        </div>
      </div>
      <div class="card-betbuilder__body">
        <div class="card-betbuilder__selections">
          ${rows}
        </div>
      </div>
      <div class="card-betbuilder__footer">
        <span class="card-betbuilder__odds">${odds}</span>
        <span class="card-betbuilder__footer-spacer"></span>
        <button class="button button--small">Add</button>
      </div>
    </div>`;
}

const DEFAULTS = {
  match: 'Pafos — RB Salzburg',
  odds: '3.71',
  selections: [
    ['Match result', 'RB Salzburg'],
    ['Total goals', 'Over 1.5'],
    ['Corners total', 'Over 7.5'],
    ['Goal in 1st half', 'Yes'],
  ],
};

export default {
  title: 'IW Design System/Card Betbuilder',
  argTypes: {
    match: { control: 'text' },
    odds:  { control: 'text' },
  },
  args: {
    match: DEFAULTS.match,
    odds: DEFAULTS.odds,
  },
  render: ({ match, odds }) => renderCard({ ...DEFAULTS, match, odds }),
};

export const Default = {};

export const Overview = {
  render: () => `
    <div style="display:flex;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderCard(DEFAULTS)}
    </div>`,
};
