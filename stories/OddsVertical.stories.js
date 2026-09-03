import lockIcon from '../assets/icons/lock-1.svg?raw';

// Inline the real lock: add the sizing class, force currentColor so it inherits
// the locked state's colour, and namespace internal ids.
const LOCK_ICON = lockIcon
  .replace('<svg', '<svg class="odds-vertical__lock"')
  .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
  .replace(/stroke="(?!none)[^"]*"/g, 'stroke="currentColor"')
  .replace(/id="([^"]+)"/g, 'id="ovlock-$1"')
  .replace(/url\(#([^)]+)\)/g, 'url(#ovlock-$1)');

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

  // width:96px matches the Figma cell — display-only, kept off the base class
  // so bet-element can size the reused .odds-vertical to its own layout.
  return `<div class="${classes.join(' ')}" style="width:96px">${content}</div>`;
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
