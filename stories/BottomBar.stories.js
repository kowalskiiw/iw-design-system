import homeRaw from '../assets/icons/home.svg?raw';
import liveRaw from '../assets/icons/live.svg?raw';
import betslipRaw from '../assets/icons/betslip.svg?raw';
import mybetsRaw from '../assets/icons/mybets.svg?raw';
import casinoRaw from '../assets/icons/casino.svg?raw';

function prep(svg, key) {
  return svg
    .replace('<svg', '<svg class="bottom-bar__icon"')
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`);
}

const ICONS = {
  home: prep(homeRaw, 'bbhome'),
  live: prep(liveRaw, 'bblive'),
  betslip: prep(betslipRaw, 'bbbet'),
  mybets: prep(mybetsRaw, 'bbmy'),
  casino: prep(casinoRaw, 'bbcasino'),
};

function item({ icon, label, active, dot, badge }) {
  const cls = active ? 'bottom-bar__item bottom-bar__item--active' : 'bottom-bar__item';
  const dotEl = dot ? '<span class="bottom-bar__dot"></span>' : '';
  const badgeEl = badge ? `<span class="bottom-bar__badge">${badge}</span>` : '';
  return `
    <button class="${cls}">
      ${ICONS[icon]}
      <span class="bottom-bar__label">${label}</span>
      ${dotEl}${badgeEl}
    </button>`;
}

function renderBottomBar(activeIndex) {
  const items = [
    { icon: 'home', label: 'Home' },
    { icon: 'live', label: 'Live', dot: true },
    { icon: 'betslip', label: 'Betslip', badge: '2' },
    { icon: 'mybets', label: 'My bets' },
    { icon: 'casino', label: 'Casino' },
  ];
  return `<div class="bottom-bar">${
    items.map((it, i) => item({ ...it, active: i === activeIndex })).join('')
  }</div>`;
}

export default {
  title: 'IW Design System/Bottom Bar',
  argTypes: {
    activeIndex: { control: { type: 'number', min: 0, max: 4, step: 1 } },
  },
  args: { activeIndex: 0 },
  render: ({ activeIndex }) => `<div style="width:360px;font-family:Inter,sans-serif">${renderBottomBar(activeIndex)}</div>`,
};

export const Default = {};

export const Overview = {
  render: () => `<div style="width:360px;font-family:Inter,sans-serif">${renderBottomBar(0)}</div>`,
};
