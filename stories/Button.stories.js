export default {
  title: 'IW Design System/Button',
  argTypes: {
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
    block:    { control: 'boolean' },
  },
  args: {
    label: 'Place Bet',
    disabled: false,
    loading: false,
    block: false,
  },
  render: ({ label, disabled, loading, block }) => {
    const classes = ['button'];
    if (loading) classes.push('button--loading');
    if (block) classes.push('button--block');

    const spinner = loading
      ? '<span class="button__spinner" aria-hidden="true"></span>'
      : '';
    const disabledAttr = disabled ? 'disabled aria-disabled="true"' : '';

    return `<button class="${classes.join(' ')}" ${disabledAttr}>${spinner}<span>${label}</span></button>`;
  },
};

export const Default = {};
export const Disabled = { args: { disabled: true } };
export const Loading  = { args: { loading: true, label: 'Placing…' } };
export const FullWidth = { args: { block: true, label: 'Deposit' } };

// A static overview of the states you can see without interacting.
// Hover / pressed / focus are live — hover, click-and-hold, or Tab to the buttons above.
export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      <button class="button"><span>Default</span></button>
      <button class="button" disabled aria-disabled="true"><span>Disabled</span></button>
      <button class="button button--loading"><span class="button__spinner" aria-hidden="true"></span><span>Loading</span></button>
      <div style="width:336px"><button class="button button--block"><span>Full width</span></button></div>
    </div>`,
};
