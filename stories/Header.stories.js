const LOGO_PLACEHOLDER =
  '<div class="header__logo" style="background:rgba(16,26,40,.15);border-radius:3px"></div>';

const CHEVRON_LEFT =
  '<svg class="header__icon header__icon--back" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<path d="M10 3L5 8l5 5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

const CROSS_ICON =
  '<svg class="header__icon header__icon--close" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<path d="M4 4l8 8M12 4l-8 8" stroke="black" stroke-width="1.5" stroke-linecap="round"/>' +
  '</svg>';

const AVATAR_ICON =
  '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">' +
  '<circle cx="8" cy="6" r="3" fill="black"/>' +
  '<path d="M2 14c0-3 3-5 6-5s6 2 6 5" fill="black"/>' +
  '</svg>';

function renderSubPage({ backIcon, closeIcon }) {
  return `
    <div class="header">
      <div class="header__side header__side--left">${backIcon ? CHEVRON_LEFT : ''}</div>
      ${LOGO_PLACEHOLDER}
      <div class="header__side header__side--right">${closeIcon ? CROSS_ICON : ''}</div>
    </div>`;
}

function renderAccount({ balance }) {
  return `
    <div class="header header--account">
      ${LOGO_PLACEHOLDER}
      <div class="header__account">
        <span class="header__balance">${balance}</span>
        <div class="header__avatar">${AVATAR_ICON}</div>
      </div>
    </div>`;
}

function renderRegister() {
  return `
    <div class="header header--register">
      ${LOGO_PLACEHOLDER}
      <div class="header__actions">
        <button class="secondary-button"><span>Login</span></button>
        <button class="header__cta">Register</button>
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Header',
  argTypes: {
    variant:   { control: 'inline-radio', options: ['sub-page', 'account', 'register'] },
    backIcon:  { control: 'boolean' },
    closeIcon: { control: 'boolean' },
    balance:   { control: 'text' },
  },
  args: {
    variant: 'sub-page',
    backIcon: true,
    closeIcon: true,
    balance: '€248',
  },
  render: ({ variant, backIcon, closeIcon, balance }) => {
    if (variant === 'account') return renderAccount({ balance });
    if (variant === 'register') return renderRegister();
    return renderSubPage({ backIcon, closeIcon });
  },
};

export const SubPage  = { name: 'Sub Page', args: { variant: 'sub-page' } };
export const Account  = { args: { variant: 'account' } };
export const Register = { args: { variant: 'register' } };

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;width:360px;font-family:Inter,sans-serif">
      ${renderSubPage({ backIcon: true, closeIcon: true })}
      ${renderAccount({ balance: '€248' })}
      ${renderRegister()}
    </div>`,
};
