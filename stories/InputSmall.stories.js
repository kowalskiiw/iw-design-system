export default {
  title: 'IW Design System/Input Small',
  argTypes: {
    value: { control: 'text' },
  },
  args: {
    value: 'Stake',
  },
  render: ({ value }) =>
    `<div class="input-small"><span class="input-small__value">${value}</span></div>`,
};

// input-small.css has just one state — Figma defines "Input Small" as a
// single fixed component, not a variant set (see the header comment in
// components/input-small.css), so there's no state control and only one
// named export here.
export const Default = {};

export const Overview = {
  render: () => `
    <div style="display:flex;font-family:Inter,sans-serif">
      <div class="input-small"><span class="input-small__value">Stake</span></div>
    </div>`,
};
