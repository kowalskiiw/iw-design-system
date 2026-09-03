import checkRaw from '../assets/icons/checkmark-2.svg?raw';

const CHECK = checkRaw
  .replace('<svg', '<svg class="toast__icon"')
  .replace(/id="([^"]+)"/g, 'id="toast-$1"')
  .replace(/url\(#([^)]+)\)/g, 'url(#toast-$1)');

function renderToast({ message }) {
  return `
    <div class="toast">
      ${CHECK}
      <span class="toast__text">${message}</span>
    </div>`;
}

export default {
  title: 'IW Design System/Toast',
  argTypes: {
    message: { control: 'text' },
  },
  args: {
    message: 'Payout successful',
  },
  render: (args) => renderToast(args),
};

export const Default = {};

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderToast({ message: 'Payout successful' })}
      ${renderToast({ message: 'Bet added to betslip' })}
    </div>`,
};
