import alertIconRaw from '../assets/icons/alert.svg?raw';

// Only one icon asset exists right now (a warning triangle), so both
// states use it for the moment — visually odd for Verified, but it's
// what's actually in the repo. Swap in a checkmark asset for Verified
// once one exists. The SVG's fill="currentColor" means it always
// inherits the badge's own text color, so nothing is hardcoded here.
const BADGE_ICON = alertIconRaw.replace('<svg ', '<svg class="badge__icon" ');

function renderBadge(state) {
  const isVerified = state === 'verified';
  const classes = ['badge', isVerified ? 'badge--verified' : 'badge--unverified'];
  const label = isVerified ? 'Verified' : 'Unverified';

  return `<span class="${classes.join(' ')}">${BADGE_ICON}${label}</span>`;
}

export default {
  title: 'IW Design System/Verified Badge',
  argTypes: {
    state: { control: 'inline-radio', options: ['verified', 'unverified'] },
  },
  args: {
    state: 'verified',
  },
  render: ({ state }) => renderBadge(state),
};

export const Verified   = {};
export const Unverified = { args: { state: 'unverified' } };

export const Overview = {
  render: () => `
    <div style="display:flex;gap:16px;align-items:center;font-family:Inter,sans-serif">
      ${renderBadge('verified')}
      ${renderBadge('unverified')}
    </div>`,
};
