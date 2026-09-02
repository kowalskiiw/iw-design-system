const CHEVRON_ICON =
  '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

function renderMethodItem(title) {
  return `
    <div class="method-item" tabindex="0">
      <div class="method-item__row">
        <div class="method-item__logo"></div>
        <div class="method-item__body">
          <span class="method-item__title">${title}</span>
          <span class="method-item__icon">${CHEVRON_ICON}</span>
        </div>
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Method Item',
  argTypes: {
    title: { control: 'text' },
  },
  args: {
    title: 'ID Austria',
  },
  render: ({ title }) => renderMethodItem(title),
};

export const Default = {};

// Static overview. Hover / Focused are live, not modifier classes —
// method-item.css uses real :hover / :focus-visible (see its header
// comment), same as button.css. Hover or Tab to the row above (or in
// this Overview) to see those token colours and the focus ring.
export const Overview = {
  render: () => `
    <div style="width:336px;font-family:Inter,sans-serif">
      ${renderMethodItem('ID Austria')}
    </div>`,
};
