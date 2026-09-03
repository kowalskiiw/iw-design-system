import calendarRaw from '../assets/sports/calendar.svg?raw';

const CALENDAR_ICON = calendarRaw
  .replace('<svg', '<svg class="chip__icon"')
  .replace(/id="([^"]+)"/g, 'id="chip-$1"')
  .replace(/url\(#([^)]+)\)/g, 'url(#chip-$1)');

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
