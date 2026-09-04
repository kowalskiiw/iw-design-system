import card from '../assets/rotator/card.jpg';
import card1 from '../assets/rotator/card-1.jpg';
import card2 from '../assets/rotator/card-2.jpg';

function slide({ image, title, subtitle, odds }) {
  const [o1, o2] = odds;
  return `
    <div class="rotator__slide">
      <img class="rotator__image" src="${image}" alt="">
      <div class="rotator__content">
        <div class="rotator__title">${title}</div>
        <div class="rotator__subtitle">${subtitle}</div>
        <div class="rotator__odds">
          <button class="odds-glass"><span class="odds-glass__value">${o1}</span></button>
          <button class="odds-glass"><span class="odds-glass__value">${o2}</span></button>
        </div>
      </div>
    </div>`;
}

const SLIDES = [
  { image: card,  title: 'Novak Djokovic<br>– Carlos Alcaraz', subtitle: 'ATP Finals · Semifinal', odds: ['1.00', '1.55'] },
  { image: card1, title: 'Bayern München<br>– Dortmund',       subtitle: 'Bundesliga · Matchday 1', odds: ['1.80', '2.10'] },
  { image: card2, title: 'Real Madrid<br>– Barcelona',         subtitle: 'La Liga · El Clásico',    odds: ['2.40', '1.95'] },
];

export default {
  title: 'IW Design System/Rotator',
  render: () => `<div class="rotator" style="max-width:700px;font-family:Inter,sans-serif">${SLIDES.map(slide).join('')}</div>`,
};

export const Default = {};

export const SingleSlide = {
  name: 'Single slide',
  render: () => `<div style="width:320px;font-family:Inter,sans-serif">${slide(SLIDES[0])}</div>`,
};
