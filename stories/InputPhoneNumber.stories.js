const CHEVRON_ICON =
  '<svg class="phone-input__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

const LOCK_ICON =
  '<svg class="phone-input__lock" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/>' +
  '<path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" stroke-width="1.3"/>' +
  '</svg>';

const MODIFIER = {
  enabled: '',
  'focused-area-code': 'phone-input--focused-area-code',
  focused: 'phone-input--focused',
  error: 'phone-input--error',
  disabled: 'phone-input--disabled',
};

function renderPhoneInput({ areaCode, number, state, filled }) {
  const classes = ['phone-input'];
  if (MODIFIER[state]) classes.push(MODIFIER[state]);
  const disabled = state === 'disabled';

  return `
    <div class="${classes.join(' ')}">
      <div class="phone-input__area-code">
        <label class="phone-input__label">Area code</label>
        <button class="phone-input__field" type="button" ${disabled ? 'disabled' : ''}>
          <span class="phone-input__value">${areaCode}</span>
          ${CHEVRON_ICON}
        </button>
        <p class="phone-input__helper">Text message over two lines.</p>
      </div>
      <div class="phone-input__number">
        <label class="phone-input__label">Mobile number</label>
        <div class="phone-input__field">
          <input class="phone-input__value" placeholder="Placeholder" ${filled ? `value="${number}"` : ''} ${disabled ? 'disabled' : ''}>
          ${disabled ? LOCK_ICON : ''}
        </div>
        <p class="phone-input__helper">${state === 'error' ? 'Please enter a valid number' : 'Text message'}</p>
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Input Phone Number',
  argTypes: {
    areaCode: { control: 'text' },
    number:   { control: 'text' },
    state:    { control: 'inline-radio', options: ['enabled', 'focused-area-code', 'focused', 'error', 'disabled'] },
    filled:   { control: 'boolean' },
  },
  args: {
    areaCode: '+43',
    number: '6609112454',
    state: 'enabled',
    filled: true,
  },
  render: (args) => renderPhoneInput(args),
};

export const Enabled = {};

export const FocusedAreaCode = {
  name: 'Focused Area Code',
  args: { state: 'focused-area-code' },
};

export const Focused  = { args: { state: 'focused' } };
export const Error    = { args: { state: 'error' } };
export const Disabled = { args: { state: 'disabled' } };

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderPhoneInput({ areaCode: '+43', number: '6609112454', state: 'enabled', filled: true })}
      ${renderPhoneInput({ areaCode: '+43', number: '6609112454', state: 'focused-area-code', filled: true })}
      ${renderPhoneInput({ areaCode: '+43', number: '6609112454', state: 'focused', filled: true })}
      ${renderPhoneInput({ areaCode: '+43', number: '6609112454', state: 'error', filled: true })}
      ${renderPhoneInput({ areaCode: '+43', number: '6609112454', state: 'disabled', filled: true })}
    </div>`,
};
