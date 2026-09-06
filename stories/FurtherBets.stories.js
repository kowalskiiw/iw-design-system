import chevronRaw from '../assets/icons/chevron.svg?raw';

const CHEVRON = chevronRaw
  .replace('<svg', '<svg class="further-bets__chevron"')
  .replace(/id="([^"]+)"/g, 'id="fb-$1"')
  .replace(/url\(#([^)]+)\)/g, 'url(#fb-$1)');

const MODIFIER = { default: '', hover: 'further-bets--hover' };

function renderRow({ label, state }) {
  const cls = ['further-bets'];
  if (MODIFIER[state]) cls.push(MODIFIER[state]);
  return `<div class="${cls.join(' ')}"><span class="further-bets__label">${label}</span>${CHEVRON}</div>`;
}

export default {
  title: 'IW Design System/Further Bets',
  argTypes: {
    label: { control: 'text' },
    state: { control: 'inline-radio', options: ['default', 'hover'] },
  },
  args: { label: 'Results', state: 'default' },
  render: (args) => `<div style="width:336px;font-family:Inter,sans-serif">${renderRow(args)}</div>`,
};

export const Default = {};
export const Hover    = { args: { state: 'hover' } };

export const Overview = {
  render: () => `
    <div style="width:336px;font-family:Inter,sans-serif">
      ${renderRow({ label: 'Results', state: 'default' })}
      ${renderRow({ label: 'Goalscorers', state: 'default' })}
      ${renderRow({ label: 'Corners', state: 'default' })}
    </div>`,
};
