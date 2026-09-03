import starIcon from '../assets/sports/star.svg?raw';
import soccerIcon from '../assets/sports/soccer.svg?raw';
import tennisIcon from '../assets/sports/tennis.svg?raw';
import basketballIcon from '../assets/sports/basketball.svg?raw';
import hockeyIcon from '../assets/sports/hockey.svg?raw';

// Prep a raw Figma SVG for inline use:
//  1) add class="tab-big__icon" so the CSS sizes it to 24x24
//  2) namespace internal ids (clip paths, gradients) per icon so multiple
//     inlined SVGs on one page don't collide. Colours are left untouched.
function prep(svg, key) {
  return svg
    .replace('<svg', '<svg class="tab-big__icon"')
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`)
    .replace(/(xlink:href|href)="#([^"]+)"/g, `$1="#${key}-$2"`);
}

const TABS = [
  { count: '57', label: 'All',        icon: prep(starIcon,       'star') },
  { count: '6',  label: 'Football',   icon: prep(soccerIcon,     'soccer') },
  { count: '12', label: 'Tennis',     icon: prep(tennisIcon,     'tennis') },
  { count: '9',  label: 'Basketball', icon: prep(basketballIcon, 'basketball') },
  { count: '4',  label: 'Hockey',     icon: prep(hockeyIcon,     'hockey') },
];

function tab({ count, label, icon }, selected) {
  const cls = selected ? 'tab-big tab-big--selected' : 'tab-big';
  return `<div class="${cls}">
    <span class="tab-big__count">${count}</span>
    ${icon}
    <span class="tab-big__label">${label}</span>
  </div>`;
}

function tabBar(selectedIndex) {
  return `<div style="display:flex;align-items:flex-end">${
    TABS.map((t, i) => tab(t, i === selectedIndex)).join('')
  }</div>`;
}

export default {
  title: 'IW Design System/Tabs Big',
  argTypes: {
    selectedIndex: { control: { type: 'number', min: 0, max: TABS.length - 1, step: 1 } },
  },
  args: { selectedIndex: 1 },
  render: ({ selectedIndex }) => tabBar(selectedIndex),
};

export const Bar = {};

export const States = {
  render: () => `
    <div style="display:flex;gap:24px;align-items:flex-end;font-family:Inter,sans-serif">
      ${tab(TABS[0], false)}
      ${tab(TABS[1], true)}
    </div>`,
};

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:24px;font-family:Inter,sans-serif">
      ${tabBar(0)}
      ${tabBar(1)}
    </div>`,
};
