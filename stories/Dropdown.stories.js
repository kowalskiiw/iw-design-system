import chevronDownRaw from '../assets/icons/chevron-down.svg?raw';
import chevronUpRaw from '../assets/icons/chevron-up.svg?raw';
import lockRaw from '../assets/icons/lock-1.svg?raw';

function prep(svg, cls, key) {
  return svg
    .replace('<svg', `<svg class="${cls}"`)
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`);
}

const CHEVRON_DOWN = prep(chevronDownRaw, 'dropdown__icon', 'ddown');
const CHEVRON_UP   = prep(chevronUpRaw, 'dropdown__icon', 'dup');
const LOCK_ICON    = prep(lockRaw, 'dropdown__lock', 'dlock');

const MODIFIER = {
  enabled: '',
  focused: 'dropdown--focused',
  open: 'dropdown--open',
  error: 'dropdown--error',
  disabled: 'dropdown--disabled',
};

function renderDropdown({ label, value, placeholder, helper, state, filled }) {
  const classes = ['dropdown'];
  if (MODIFIER[state]) classes.push(MODIFIER[state]);

  const valueEl = filled
    ? `<span class="dropdown__value">${value}</span>`
    : `<span class="dropdown__value dropdown__value--placeholder">${placeholder}</span>`;

  const chevron = state === 'open' ? CHEVRON_UP : CHEVRON_DOWN;

  return `
    <div class="${classes.join(' ')}">
      <label class="dropdown__label">${label}</label>
      <button class="dropdown__field" type="button" ${state === 'disabled' ? 'disabled' : ''}>
        ${valueEl}
        ${state === 'disabled' ? LOCK_ICON : chevron}
      </button>
      <p class="dropdown__helper">${helper}</p>
    </div>`;
}

export default {
  title: 'IW Design System/Dropdown',
  argTypes: {
    label:       { control: 'text' },
    value:       { control: 'text' },
    placeholder: { control: 'text' },
    helper:      { control: 'text' },
    state:       { control: 'inline-radio', options: ['enabled', 'focused', 'open', 'error', 'disabled'] },
    filled:      { control: 'boolean' },
  },
  args: {
    label: 'Label',
    value: 'EUR (EURO)',
    placeholder: 'Please select...',
    helper: 'Text message',
    state: 'enabled',
    filled: true,
  },
  render: (args) => renderDropdown(args),
};

export const Enabled  = {};
export const Focused  = { args: { state: 'focused' } };
export const Open     = { args: { state: 'open' } };
export const Error    = { args: { state: 'error', helper: 'Please select a currency' } };
export const Disabled = { args: { state: 'disabled', value: 'Bayern' } };

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderDropdown({ label: 'Label', value: 'EUR (EURO)', placeholder: 'Please select...', helper: 'Text message', state: 'enabled', filled: true })}
      ${renderDropdown({ label: 'Label', value: 'EUR (EURO)', placeholder: 'Please select...', helper: 'Text message', state: 'focused', filled: true })}
      ${renderDropdown({ label: 'Label', value: 'EUR (EURO)', placeholder: 'Please select...', helper: 'Text message', state: 'open', filled: true })}
      ${renderDropdown({ label: 'Label', value: 'EUR (EURO)', placeholder: 'Please select...', helper: 'Please select a currency', state: 'error', filled: true })}
      ${renderDropdown({ label: 'Label', value: 'Bayern', placeholder: 'Please select...', helper: 'Text message', state: 'disabled', filled: true })}
    </div>`,
};
