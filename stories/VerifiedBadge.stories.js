const CHECK_ICON =
  '<svg class="badge__icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
  '<circle cx="6" cy="6" r="5.25" stroke="currentColor" stroke-width="1.2"/>' +
  '<path d="M3.75 6.25l1.5 1.5 3-3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

const ALERT_ICON =
  '<svg class="badge__icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
  '<circle cx="6" cy="6" r="5.25" stroke="currentColor" stroke-width="1.2"/>' +
  '<path d="M6 3.5v3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>' +
  '<circle cx="6" cy="8.25" r="0.6" fill="currentColor"/>' +
  '</svg>';

function renderBadge(state) {
  const isVerified = state === 'verified';
  const classes = ['badge', isVerified ? 'badge--verified' : 'badge--unverified'];
  const icon = isVerified ? CHECK_ICON : ALERT_ICON;
  const label = isVerified ? 'Verified' : 'Unverified';

  return `<span class="${classes.join(' ')}">${icon}${label}</span>`;
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
