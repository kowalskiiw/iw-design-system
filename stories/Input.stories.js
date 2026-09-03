import lockRaw from '../assets/icons/lock-1.svg?raw';
import eyeRaw from '../assets/icons/eye-closed.svg?raw';

function prep(svg, cls, key) {
  return svg
    .replace('<svg', `<svg class="${cls}"`)
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`);
}

const LOCK_ICON = prep(lockRaw, 'input__lock', 'inlock');
const EYE_ICON  = prep(eyeRaw, 'input__icon', 'ineye');

const MODIFIER = {
  enabled: '',
  focused: 'input--focused',
  error: 'input--error',
  disabled: 'input--disabled',
};

function renderInput({ label, value, placeholder, helper, state, filled }) {
  const classes = ['input'];
  if (MODIFIER[state]) classes.push(MODIFIER[state]);

  // Disabled shows the lock; all other states show the eye (visibility) icon.
  const trailing = state === 'disabled' ? LOCK_ICON : EYE_ICON;

  return `
    <div class="${classes.join(' ')}">
      <label class="input__label">${label}</label>
      <div class="input__field">
        <input class="input__control" placeholder="${placeholder}" ${filled ? `value="${value}"` : ''} ${state === 'disabled' ? 'disabled' : ''}>
        ${trailing}
      </div>
      <p class="input__helper">${helper}</p>
    </div>`;
}

export default {
  title: 'IW Design System/Input',
  argTypes: {
    label:       { control: 'text' },
    value:       { control: 'text' },
    placeholder: { control: 'text' },
    helper:      { control: 'text' },
    state:       { control: 'inline-radio', options: ['enabled', 'focused', 'error', 'disabled'] },
    filled:      { control: 'boolean' },
  },
  args: {
    label: 'Label',
    value: 'Text Input',
    placeholder: 'Placeholder',
    helper: 'Text message',
    state: 'enabled',
    filled: true,
  },
  render: (args) => renderInput(args),
};

export const Enabled  = {};
export const Focused  = { args: { state: 'focused' } };
export const Error    = { args: { state: 'error', helper: 'This field is required' } };
export const Disabled = { args: { state: 'disabled' } };

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderInput({ label: 'Label', value: 'Text Input', placeholder: 'Placeholder', helper: 'Text message', state: 'enabled', filled: true })}
      ${renderInput({ label: 'Label', value: 'Text Input', placeholder: 'Placeholder', helper: 'Text message', state: 'focused', filled: true })}
      ${renderInput({ label: 'Label', value: 'Text Input', placeholder: 'Placeholder', helper: 'This field is required', state: 'error', filled: true })}
      ${renderInput({ label: 'Label', value: 'Text Input', placeholder: 'Placeholder', helper: 'Text message', state: 'disabled', filled: true })}
    </div>`,
};
