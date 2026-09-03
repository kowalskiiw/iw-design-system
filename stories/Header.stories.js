import logo from '../assets/brand/interwetten.svg';
import chevronLeftRaw from '../assets/icons/chevron-left.svg?raw';
import crossRaw from '../assets/icons/cross-big.svg?raw';
import avatarRaw from '../assets/icons/avatar-1.svg?raw';

function prep(svg, cls, key) {
  return svg
    .replace('<svg', `<svg class="${cls}"`)
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`);
}

const BACK   = prep(chevronLeftRaw, 'header__icon', 'hback');
const CLOSE  = prep(crossRaw, 'header__icon', 'hclose');
const AVATAR = prep(avatarRaw, 'header__avatar-icon', 'havatar');

const LOGO = `<img class="header__logo" src="${logo}" alt="interwetten">`;

function subPage() {
  return `
    <div class="header">
      <div class="header__side"><button class="header__icon-btn" aria-label="Back">${BACK}</button></div>
      ${LOGO}
      <div class="header__side header__side--right"><button class="header__icon-btn" aria-label="Close">${CLOSE}</button></div>
    </div>`;
}

function account() {
  return `
    <div class="header">
      ${LOGO}
      <div class="header__account">
        <span class="header__balance">€248</span>
        <span class="header__avatar">${AVATAR}</span>
      </div>
    </div>`;
}

function register() {
  return `
    <div class="header">
      ${LOGO}
      <div class="header__buttons">
        <button class="secondary-button">Login</button>
        <button class="button button--small">Register</button>
      </div>
    </div>`;
}

const RENDER = { 'sub-page': subPage, account, register };

export default {
  title: 'IW Design System/Header',
  argTypes: {
    type: { control: 'inline-radio', options: ['sub-page', 'account', 'register'] },
  },
  args: { type: 'sub-page' },
  render: ({ type }) => RENDER[type](),
};

export const SubPage  = { name: 'Sub Page', args: { type: 'sub-page' } };
export const Account  = { args: { type: 'account' } };
export const Register = { args: { type: 'register' } };

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${subPage()}
      ${account()}
      ${register()}
    </div>`,
};
