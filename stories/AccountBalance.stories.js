import exclamationRaw from '../assets/icons/exclamation.svg?raw';
import chevronRaw from '../assets/icons/chevron.svg?raw';
import alertRaw from '../assets/icons/alert.svg?raw';

function prep(svg, cls, key) {
  return svg
    .replace('<svg', `<svg class="${cls}"`)
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`);
}

const EXCLAMATION_ICON = prep(exclamationRaw, 'account-balance__icon', 'abexcl');
const CHEVRON_ICON     = prep(chevronRaw, 'account-balance__chevron', 'abchev');
const BADGE_ICON       = prep(alertRaw, 'badge__icon', 'abalert');

function renderDefault({ title, subtitle, showBadge }) {
  return `
    <div class="account-balance">
      <div class="account-balance__content">
        <div class="account-balance__header">
          ${EXCLAMATION_ICON}
          <span class="account-balance__title">${title}</span>
          ${showBadge ? `<span class="badge badge--verified">${BADGE_ICON}Verified</span>` : ''}
        </div>
        <span class="account-balance__subtitle">${subtitle}</span>
      </div>
      ${CHEVRON_ICON}
    </div>`;
}

function renderBalance({ title }) {
  return `
    <div class="account-balance account-balance--balance">
      <div class="account-balance__top">
        <div class="account-balance__content">
          <div class="account-balance__header">
            ${EXCLAMATION_ICON}
            <span class="account-balance__title">${title}</span>
          </div>
        </div>
        ${CHEVRON_ICON}
      </div>
      <div class="account-balance__rows">
        <div class="account-balance__row">
          <span class="account-balance__row-label">Main credit balance:</span>
          <span class="account-balance__row-value">20.163,41 &euro;</span>
        </div>
        <div class="account-balance__row">
          <span class="account-balance__row-label">Credit under review:</span>
          <span class="account-balance__row-value">20.163,41 &euro;</span>
        </div>
        <hr class="account-balance__divider">
        <div class="account-balance__row account-balance__row--total">
          <span class="account-balance__row-label">Total credit:</span>
          <span class="account-balance__row-value">21.163,41 &euro;</span>
        </div>
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Account Balance',
  argTypes: {
    variant:   { control: 'inline-radio', options: ['default', 'balance'] },
    title:     { control: 'text' },
    subtitle:  { control: 'text' },
    showBadge: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    title: 'Sportsbook',
    subtitle: 'xxx.xxx Punkte',
    showBadge: true,
  },
  render: ({ variant, title, subtitle, showBadge }) =>
    variant === 'balance'
      ? renderBalance({ title })
      : renderDefault({ title, subtitle, showBadge }),
};

export const Default = {};
export const Balance = { args: { variant: 'balance' } };

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:24px;width:312px;font-family:Inter,sans-serif">
      ${renderDefault({ title: 'Sportsbook', subtitle: 'xxx.xxx Punkte', showBadge: true })}
      ${renderBalance({ title: 'Sportsbook' })}
    </div>`,
};
