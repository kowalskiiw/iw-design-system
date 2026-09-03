function renderArticle({ meta, title, desc, image }) {
  const slot = image
    ? `<img class="article__image" src="${image}" alt="">`
    : '';
  return `
    <div class="article">
      <div class="article__image-slot">${slot}</div>
      <div class="article__body">
        <span class="article__meta">${meta}</span>
        <span class="article__title">${title}</span>
        <span class="article__desc">${desc}</span>
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Article',
  argTypes: {
    meta:  { control: 'text' },
    title: { control: 'text' },
    desc:  { control: 'text' },
    image: { control: 'text' },
  },
  args: {
    meta: 'Guide · 6 min',
    title: '2. Bundesliga 2026/27 preview',
    desc: 'Promotion favourites, dark horses and where the value sits.',
    image: '',
  },
  render: (args) => renderArticle(args),
};

export const Default = {};

export const Overview = {
  render: () => `
    <div style="display:flex;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderArticle({ meta: 'Guide · 6 min', title: '2. Bundesliga 2026/27 preview', desc: 'Promotion favourites, dark horses and where the value sits.', image: '' })}
    </div>`,
};
