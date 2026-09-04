import spinnerRaw from '../assets/icons/spinner.svg?raw';

const SPINNER = spinnerRaw
  .replace('<svg', '<svg class="secondary-button__spinner" aria-hidden="true"')
  .replace(/id="([^"]+)"/g, 'id="sbspin-$1"')
  .replace(/url\(#([^)]+)\)/g, 'url(#sbspin-$1)');

export default {
  title: 'IW Design System/Secondary Button',
  argTypes: {
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
  },
  args: {
    label: 'Login',
    disabled: false,
    loading: false,
  },
  render: ({ label, disabled, loading }) => {
    const classes = ['secondary-button'];
    if (loading) classes.push('secondary-button--loading');
    const spinner = loading ? SPINNER : '';
    const text = loading ? 'Loading' : label;
    const disabledAttr = disabled ? 'disabled aria-disabled="true"' : '';
    return `<button class="${classes.join(' ')}" ${disabledAttr}>${spinner}<span>${text}</span></button>`;
  },
};

export const Default  = {};
export const Disabled = { args: { disabled: true } };
export const Loading  = { args: { loading: true } };

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      <button class="secondary-button"><span>Login</span></button>
      <button class="secondary-button" disabled aria-disabled="true"><span>Disabled</span></button>
      <button class="secondary-button secondary-button--loading">${SPINNER}<span>Loading</span></button>
    </div>`,
};
