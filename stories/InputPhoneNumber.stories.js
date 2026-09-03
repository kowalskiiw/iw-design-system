import chevronRaw from '../assets/icons/chevron-down.svg?raw';
import lockRaw from '../assets/icons/lock-1.svg?raw';

// UI icons -> force currentColor + namespace ids so multiple inline SVGs don't collide.
function prep(svg, cls, key) {
  return svg
    .replace('<svg', `<svg class="${cls}"`)
    .replace(/fill="none"/g, 'fill="__NONE__"')
    .replace(/stroke="none"/g, 'stroke="__NONE__"')
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
    .replace(/<path (?![^>]*fill=)/g, '<path fill="currentColor" ')
    .replace(/"__NONE__"/g, '"none"')
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`)
    .replace(/(xlink:href|href)="#([^"]+)"/g, `$1="#${key}-$2"`);
}

const CHEVRON_ICON = prep(chevronRaw, 'phone-input__icon', 'pichev');
const LOCK_ICON = prep(lockRaw, 'phone-input__lock', 'pilock');

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
export const FocusedAreaCode = { name: 'Focused Area Code', args: { state: 'focused-area-code' } };
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
