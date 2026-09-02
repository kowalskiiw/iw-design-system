export default {
  title: 'IW Design System/Odds Simple',
  argTypes: {
    value:    { control: 'text' },
    selected: { control: 'boolean' },
  },
  args: {
    value: '1.50',
    selected: false,
  },
  render: ({ value, selected }) => {
    const classes = ['odds-simple'];
    if (selected) classes.push('odds-simple--selected');

    return `<div class="${classes.join(' ')}"><span class="odds-simple__value">${value}</span></div>`;
  },
};

export const Default  = {};
export const Selected = { args: { selected: true } };

export const Overview = {
  render: () => `
    <div style="display:flex;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      <div class="odds-simple"><span class="odds-simple__value">1.50</span></div>
      <div class="odds-simple odds-simple--selected"><span class="odds-simple__value">1.50</span></div>
    </div>`,
};
