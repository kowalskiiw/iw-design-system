export default {
  title: 'IW Design System/Button',
  argTypes: {
    label:    { control: 'text' },
    size:     { control: 'inline-radio', options: ['big', 'small'] },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
    block:    { control: 'boolean' },
  },
  args: {
    label: 'Place Bet',
    size: 'big',
    disabled: false,
    loading: false,
    block: false,
  },
  render: ({ label, size, disabled, loading, block }) => {
    const classes = ['button'];
    if (size === 'small') classes.push('button--small');
    if (loading) classes.push('button--loading');
    if (block) classes.push('button--block');

    const spinner = loading
      ? '<span class="button__spinner" aria-hidden="true"></span>'
      : '';
    const text = loading ? 'Loading' : label;
    const disabledAttr = disabled ? 'disabled aria-disabled="true"' : '';

    return `<button class="${classes.join(' ')}" ${disabledAttr}>${spinner}<span>${text}</span></button>`;
  },
};

export const Default = {};
export const Small     = { args: { size: 'small' } };
export const Disabled  = { args: { disabled: true } };
export const Loading   = { args: { loading: true } };
export const FullWidth = { args: { block: true, label: 'Deposit' } };

// Static overview. Hover / pressed / focus are live — hover, click-and-hold,
// or Tab to the buttons above to see those token colours.
export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      <button class="button"><span>Big / Default</span></button>
      <button class="button button--small"><span>Small / Default</span></button>
      <button class="button" disabled aria-disabled="true"><span>Disabled</span></button>
      <button class="button button--loading"><span class="button__spinner" aria-hidden="true"></span><span>Loading</span></button>
      <button class="button button--small button--loading"><span class="button__spinner" aria-hidden="true"></span><span>Loading</span></button>
      <div style="width:336px"><button class="button button--block"><span>Full width</span></button></div>
    </div>`,
};
