const LOCK_ICON =
  '<svg class="odds-horizontal__lock" viewBox="0 0 13 15" fill="none" aria-hidden="true">' +
  '<rect x="1.5" y="6.5" width="10" height="7" rx="1.3" stroke="currentColor" stroke-width="1.2"/>' +
  '<path d="M4 6.5V4.5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" stroke-width="1.2"/>' +
  '</svg>';

const MODIFIER = {
  default: '',
  selected: 'odds-horizontal--selected',
  locked: 'odds-horizontal--locked',
  up: 'odds-horizontal--up',
  down: 'odds-horizontal--down',
};

function renderOdds({ label, value, state }) {
  const classes = ['odds-horizontal'];
  if (MODIFIER[state]) classes.push(MODIFIER[state]);

  const content = state === 'locked'
    ? `${LOCK_ICON}<span class="odds-horizontal__value">${value}</span>`
    : `<span class="odds-horizontal__label">${label}</span><span class="odds-horizontal__value">${value}</span>`;

  return `<div class="${classes.join(' ')}">${content}</div>`;
}

export default {
  title: 'IW Design System/Odds Horizontal',
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    state: { control: 'inline-radio', options: ['default', 'selected', 'locked', 'up', 'down'] },
  },
  args: {
    label: '1',
    value: '4.00',
    state: 'default',
  },
  render: (args) => renderOdds(args),
};

export const Default  = {};
export const Selected = { args: { state: 'selected' } };
export const Locked   = { args: { state: 'locked' } };
export const Up       = { name: 'Odds up',   args: { state: 'up' } };
export const Down     = { name: 'Odds down', args: { state: 'down' } };

export const Overview = {
  render: () => `
    <div style="display:flex;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderOdds({ label: '1', value: '4.00', state: 'default' })}
      ${renderOdds({ label: '1', value: '4.00', state: 'selected' })}
      ${renderOdds({ label: '1', value: '4.00', state: 'locked' })}
      ${renderOdds({ label: '1', value: '4.00', state: 'up' })}
      ${renderOdds({ label: '1', value: '4.00', state: 'down' })}
    </div>`,
};
