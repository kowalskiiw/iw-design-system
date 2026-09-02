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

    const spinner = loading
      ? '<span class="secondary-button__spinner" aria-hidden="true"></span>'
      : '';
    const text = loading ? 'Loading' : label;
    const disabledAttr = disabled ? 'disabled aria-disabled="true"' : '';

    return `<button class="${classes.join(' ')}" ${disabledAttr}>${spinner}<span>${text}</span></button>`;
  },
};

export const Default  = {};
export const Disabled = { args: { disabled: true } };
export const Loading  = { args: { loading: true } };

// Clicked/Pressed — Figma shows no visual change from Default (see the
// comment in secondary-button.css); this is a plain alias so the state
// still gets its own entry in the sidebar.
export const ClickedPressed = {
  name: 'Clicked/Pressed',
};

// Hover and Focused are driven by real :hover / :focus-visible in the CSS
// — there's no --hover/--focused modifier class to force, unlike
// --loading. These two stories render a static snapshot using the exact
// values from those rules in secondary-button.css. Hover or Tab to the
// Default story above to see the live version instead.
export const Hover = {
  render: ({ label }) =>
    `<button class="secondary-button" style="border-color:var(--text-secondary,#535353);color:var(--text-secondary,#535353)"><span>${label}</span></button>`,
};

export const Focused = {
  render: ({ label }) =>
    `<button class="secondary-button" style="box-shadow:inset 0 0 0 2px var(--focus-ring,#2194ff)"><span>${label}</span></button>`,
};

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      <button class="secondary-button"><span>Default</span></button>
      <button class="secondary-button" style="border-color:var(--text-secondary,#535353);color:var(--text-secondary,#535353)"><span>Hover</span></button>
      <button class="secondary-button"><span>Clicked/Pressed</span></button>
      <button class="secondary-button" style="box-shadow:inset 0 0 0 2px var(--focus-ring,#2194ff)"><span>Focused</span></button>
      <button class="secondary-button" disabled aria-disabled="true"><span>Disabled</span></button>
      <button class="secondary-button secondary-button--loading"><span class="secondary-button__spinner" aria-hidden="true"></span><span>Loading</span></button>
    </div>`,
};
