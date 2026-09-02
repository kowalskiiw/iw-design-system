const LOCK_ICON =
  '<svg class="odds-vertical__lock" viewBox="0 0 13 15" fill="none" aria-hidden="true">' +
  '<rect x="1.5" y="6.5" width="10" height="7" rx="1.3" stroke="currentColor" stroke-width="1.2"/>' +
  '<path d="M4 6.5V4.5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" stroke-width="1.2"/>' +
  '</svg>';

const MODIFIER = {
  default: '',
  selected: 'odds-vertical--selected',
  locked: 'odds-vertical--locked',
  up: 'odds-vertical--up',
  down: 'odds-vertical--down',
};

function renderOdds({ label, value, state }) {
  const classes = ['odds-vertical'];
  if (MODIFIER[state]) classes.push(MODIFIER[state]);

  const content = state === 'locked'
    ? `${LOCK_ICON}<span class="odds-vertical__value">${value}</span>`
    : `<span class="odds-vertical__label">${label}</span><span class="odds-vertical__value">${value}</span>`;

  return `<div class="${classes.join(' ')}">${content}</div>`;
}

export default {
  title: 'IW Design System/Odds Vertical',
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    state: { control: 'inline-radio', options: ['default', 'selected', 'locked', 'up', 'down'] },
  },
  args: {
    label: 'X',
    value: '4.20',
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
      ${renderOdds({ label: 'X', value: '4.20', state: 'default' })}
      ${renderOdds({ label: 'X', value: '4.20', state: 'selected' })}
      ${renderOdds({ label: 'X', value: '4.20', state: 'locked' })}
      ${renderOdds({ label: 'X', value: '4.20', state: 'up' })}
      ${renderOdds({ label: 'X', value: '4.20', state: 'down' })}
    </div>`,
};
