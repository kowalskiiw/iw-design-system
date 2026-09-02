const CHEVRON_ICON =
  '<svg class="dropdown__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

const LOCK_ICON =
  '<svg class="dropdown__lock" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/>' +
  '<path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" stroke-width="1.3"/>' +
  '</svg>';

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

  return `
    <div class="${classes.join(' ')}">
      <label class="dropdown__label">${label}</label>
      <button class="dropdown__field" type="button" ${state === 'disabled' ? 'disabled' : ''}>
        ${valueEl}
        ${CHEVRON_ICON}
        ${state === 'disabled' ? LOCK_ICON : ''}
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
