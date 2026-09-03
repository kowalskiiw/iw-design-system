import chevronRaw from '../assets/icons/chevron.svg?raw';
import idAustriaLogo from '../assets/verification/idaustria.jpg';

const CHEVRON_ICON = chevronRaw
  .replace('<svg', '<svg class="method-item__chevron"')
  .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
  .replace(/stroke="(?!none)[^"]*"/g, 'stroke="currentColor"')
  .replace(/id="([^"]+)"/g, 'id="mi-$1"')
  .replace(/url\(#([^)]+)\)/g, 'url(#mi-$1)');

function renderMethodItem(title, logoSrc) {
  const logo = logoSrc ? `<img class="method-item__logo-img" src="${logoSrc}" alt="">` : '';
  return `
    <div class="method-item" tabindex="0">
      <div class="method-item__row">
        <div class="method-item__logo">${logo}</div>
        <div class="method-item__body">
          <span class="method-item__title">${title}</span>
          <span class="method-item__icon">${CHEVRON_ICON}</span>
        </div>
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Method Item',
  argTypes: { title: { control: 'text' } },
  args: { title: 'ID Austria' },
  render: ({ title }) => renderMethodItem(title, idAustriaLogo),
};

export const Default = {};

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:12px;width:336px;font-family:Inter,sans-serif">
      ${renderMethodItem('ID Austria', idAustriaLogo)}
    </div>`,
};
