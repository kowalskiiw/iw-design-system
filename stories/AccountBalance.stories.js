const EXCLAMATION_ICON =
  '<svg class="account-balance__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/>' +
  '<path d="M8 5v4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
  '<circle cx="8" cy="11" r="0.75" fill="currentColor"/>' +
  '</svg>';

const CHEVRON_ICON =
  '<svg class="account-balance__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

const CHECK_ICON =
  '<svg class="badge__icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
  '<circle cx="6" cy="6" r="5.25" stroke="currentColor" stroke-width="1.2"/>' +
  '<path d="M3.75 6.25l1.5 1.5 3-3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

function renderDefault({ title, subtitle, showBadge }) {
  return `
    <div class="account-balance">
      <div class="account-balance__content">
        <div class="account-balance__header">
          ${EXCLAMATION_ICON}
          <span class="account-balance__title">${title}</span>
          ${showBadge ? `<span class="badge badge--verified">${CHECK_ICON}Verified</span>` : ''}
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
          <span class="account-balance__row-value">20.163,41 €</span>
        </div>
        <div class="account-balance__row">
          <span class="account-balance__row-label">Credit under review:</span>
          <span class="account-balance__row-value">20.163,41 €</span>
        </div>
        <hr class="account-balance__divider">
        <div class="account-balance__row account-balance__row--total">
          <span class="account-balance__row-label">Total credit:</span>
          <span class="account-balance__row-value">21.163,41 €</span>
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
