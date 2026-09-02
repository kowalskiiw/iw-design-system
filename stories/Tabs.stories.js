const LABELS = ['Bet builder', 'Odds', 'Stats'];

function renderRow(variant, selectedIndex) {
  const tabs = LABELS.map((label, i) => {
    const classes = ['tabs'];
    if (variant === 'Variant2' && i === selectedIndex) classes.push('tabs--selected');
    return `<div class="${classes.join(' ')}"><span class="tabs__label">${label}</span></div>`;
  }).join('');
  return `<div style="display:flex">${tabs}</div>`;
}

export default {
  title: 'IW Design System/Tabs',
  argTypes: {
    variant:       { control: 'inline-radio', options: ['Default', 'Variant2'] },
    selectedIndex: { control: { type: 'number', min: 0, max: LABELS.length - 1, step: 1 } },
  },
  args: {
    variant: 'Variant2',
    selectedIndex: 0,
  },
  render: ({ variant, selectedIndex }) => renderRow(variant, selectedIndex),
};

// Default — no tab in the row is selected (Figma property1: Default).
export const Default = { args: { variant: 'Default' } };

// Variant2 — the tab at selectedIndex gets the underline + heading colour
// (Figma property1: Variant2).
export const Variant2 = { args: { variant: 'Variant2' } };

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:24px;font-family:Inter,sans-serif">
      ${renderRow('Default', 0)}
      ${renderRow('Variant2', 0)}
    </div>`,
};
