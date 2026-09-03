const LABELS = ['Bet builder', 'Odds', 'Stats'];

function tabBar(selectedIndex) {
  const tabs = LABELS.map((label, i) => {
    const cls = i === selectedIndex ? 'tab-small tab-small--selected' : 'tab-small';
    return `<div class="${cls}"><span class="tab-small__label">${label}</span></div>`;
  }).join('');
  return `<div style="display:flex;align-items:flex-end">${tabs}</div>`;
}

export default {
  title: 'IW Design System/Tabs Small',
  argTypes: {
    selectedIndex: { control: { type: 'number', min: 0, max: LABELS.length - 1, step: 1 } },
  },
  args: { selectedIndex: 0 },
  render: ({ selectedIndex }) => tabBar(selectedIndex),
};

// A tab bar with one tab selected — the normal in-use state.
export const Bar = {};

// The two states of a single tab, side by side — mirrors the Figma component.
export const States = {
  render: () => `
    <div style="display:flex;gap:24px;align-items:flex-end;font-family:Inter,sans-serif">
      <div class="tab-small"><span class="tab-small__label">Unselected</span></div>
      <div class="tab-small tab-small--selected"><span class="tab-small__label">Selected</span></div>
    </div>`,
};

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:24px;font-family:Inter,sans-serif">
      ${tabBar(0)}
      ${tabBar(1)}
    </div>`,
};
