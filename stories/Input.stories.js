const LOCK_ICON =
  '<svg class="input__lock" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/>' +
  '<path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" stroke-width="1.3"/>' +
  '</svg>';

const MODIFIER = {
  enabled: '',
  focused: 'input--focused',
  error: 'input--error',
  disabled: 'input--disabled',
};

// Renders only the states input.css clearly supports (Enabled, Focused,
// Error, Disabled). input.css has no icon/lock-vs-visibility-toggle API
// beyond the .input__lock class used for Disabled — that trailing-icon
// question is still open on the Figma side, so nothing else is added here.
function renderInput({ label, value, placeholder, helper, state, filled }) {
  const classes = ['input'];
  if (MODIFIER[state]) classes.push(MODIFIER[state]);

  return `
    <div class="${classes.join(' ')}">
      <label class="input__label">${label}</label>
      <div class="input__field">
        <input class="input__control" placeholder="${placeholder}" ${filled ? `value="${value}"` : ''} ${state === 'disabled' ? 'disabled' : ''}>
        ${state === 'disabled' ? LOCK_ICON : ''}
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
