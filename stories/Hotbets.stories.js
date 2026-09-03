import soccerRaw from '../assets/sports/soccer.svg?raw';

const SOCCER = soccerRaw
  .replace('<svg', '<svg class="hotbets__icon"')
  .replace(/id="([^"]+)"/g, 'id="hb-$1"')
  .replace(/url\(#([^)]+)\)/g, 'url(#hb-$1)');

function renderHotbet({ title, subtitle, odds }) {
  return `
    <div class="hotbets">
      ${SOCCER}
      <div class="hotbets__body">
        <span class="hotbets__title">${title}</span>
        <span class="hotbets__subtitle">${subtitle}</span>
      </div>
      <div class="odds-simple">
        <span class="odds-simple__value">${odds}</span>
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Hotbets',
  argTypes: {
    title:    { control: 'text' },
    subtitle: { control: 'text' },
    odds:     { control: 'text' },
  },
  args: {
    title: 'Olympique Lyon',
    subtitle: 'Ligue 1 · Lyon — Nice · Home win',
    odds: '1.50',
  },
  render: (args) => `<div style="width:336px;font-family:Inter,sans-serif">${renderHotbet(args)}</div>`,
};

export const Default = {};

export const Overview = {
  render: () => `
    <div style="width:336px;font-family:Inter,sans-serif">
      ${renderHotbet({ title: 'Olympique Lyon', subtitle: 'Ligue 1 · Lyon — Nice · Home win', odds: '1.50' })}
      ${renderHotbet({ title: 'Bayern München', subtitle: 'Bundesliga · Bayern — Dortmund · Over 2.5', odds: '1.75' })}
      ${renderHotbet({ title: 'Real Madrid', subtitle: 'La Liga · Real — Barça · Both to score', odds: '2.10' })}
    </div>`,
};
