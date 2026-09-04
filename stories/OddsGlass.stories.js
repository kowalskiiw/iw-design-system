const MODIFIER = {
  default: '',
  hover: 'odds-glass--hover',
  selected: 'odds-glass--selected',
};

function renderOddsGlass({ value, state }) {
  const cls = ['odds-glass'];
  if (MODIFIER[state]) cls.push(MODIFIER[state]);
  return `<button class="${cls.join(' ')}"><span class="odds-glass__value">${value}</span></button>`;
}

// Glass buttons need a coloured/image backdrop to be visible.
const backdrop = (inner) => `
  <div style="padding:24px;border-radius:16px;background:linear-gradient(135deg,#1b7a3d,#0f5a8a);display:flex;gap:16px;align-items:center;">${inner}</div>`;

export default {
  title: 'IW Design System/Odds Glass',
  argTypes: {
    value: { control: 'text' },
    state: { control: 'inline-radio', options: ['default', 'hover', 'selected'] },
  },
  args: { value: '1.00', state: 'default' },
  render: (args) => backdrop(renderOddsGlass(args)),
};

export const Default  = {};
export const Hover     = { args: { state: 'hover' } };
export const Selected  = { args: { state: 'selected' } };

export const Overview = {
  render: () => backdrop(
    renderOddsGlass({ value: '1.55', state: 'default' }) +
    renderOddsGlass({ value: '4.20', state: 'hover' }) +
    renderOddsGlass({ value: '6.50', state: 'selected' })
  ),
};
