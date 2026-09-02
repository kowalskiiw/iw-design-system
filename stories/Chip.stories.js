const CALENDAR_ICON =
  '<svg class="chip__icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">' +
  '<rect x="3" y="4" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.4"/>' +
  '<path d="M3 8h16M7 2v4M15 2v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
  '</svg>';

export default {
  title: 'IW Design System/Chip',
  argTypes: {
    label: { control: 'text' },
    hover: { control: 'boolean' },
  },
  args: {
    label: 'Today',
    hover: false,
  },
  render: ({ label, hover }) => {
    const classes = ['chip'];
    if (hover) classes.push('chip--hover');

    return `<div class="${classes.join(' ')}">${CALENDAR_ICON}<span class="chip__label">${label}</span></div>`;
  },
};

export const Default = {};
export const Hover    = { args: { hover: true } };

export const Overview = {
  render: () => `
    <div style="display:flex;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      <div class="chip">${CALENDAR_ICON}<span class="chip__label">Today</span></div>
      <div class="chip chip--hover">${CALENDAR_ICON}<span class="chip__label">Today</span></div>
    </div>`,
};
