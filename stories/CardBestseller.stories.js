import chevronSmallRaw from '../assets/icons/chevron-small.svg?raw';
import soccerRaw from '../assets/sports/soccer.svg?raw';
import shirt1Raw from '../assets/sports/shirt-1.svg?raw';
import shirt2Raw from '../assets/sports/shirt-2.svg?raw';

function prep(svg, cls, key) {
  return svg
    .replace('<svg', `<svg class="${cls}"`)
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`);
}

const CHEVRON = prep(chevronSmallRaw, 'card-bestseller__see-all-icon', 'cbschev');

function betOdds() {
  const odds = [['1', '4.20'], ['X', '3.85'], ['2', '6.50']];
  return `<div class="bet-element__odds">${odds.map(([l, v]) => `
    <div class="odds-vertical">
      <span class="odds-vertical__label">${l}</span>
      <span class="odds-vertical__value">${v}</span>
    </div>`).join('')}</div>`;
}

function betTeams(team1, team2, i) {
  return `
    <div class="bet-element__teams">
      <div class="bet-element__team">
        ${prep(shirt2Raw, 'bet-element__team-icon', `cbs${i}s2`)}
        <span class="bet-element__team-name">${team1}</span>
      </div>
      <div class="bet-element__team">
        ${prep(shirt1Raw, 'bet-element__team-icon', `cbs${i}s1`)}
        <span class="bet-element__team-name">${team2}</span>
      </div>
    </div>`;
}

function betElement({ team1, team2 }, i) {
  return `
    <div class="bet-element bet-element--live">
      <div class="bet-element__meta">
        <div class="bet-element__meta-left">
          <span class="bet-element__live-label">LIVE</span>
          <span class="bet-element__live-clock">67&#8242;</span>
          <span class="bet-element__meta-text">2nd Half</span>
        </div>
        <div class="bet-element__league">
          ${prep(soccerRaw, 'bet-element__league-icon', `cbsl${i}`)}
          <span class="bet-element__league-name">Serie A</span>
        </div>
      </div>
      <div class="bet-element__matchup">
        ${betTeams(team1, team2, i)}
        <div class="bet-element__score"><span>2</span><span>1</span></div>
      </div>
      ${betOdds()}
    </div>`;
}

const BETS = [
  { team1: 'Atalanta', team2: 'Lazio Roma' },
  { team1: 'Inter Milano', team2: 'Juventus' },
  { team1: 'Napoli', team2: 'AS Roma' },
  { team1: 'AC Milan', team2: 'Fiorentina' },
];

function renderCardBestseller() {
  return `
    <div class="card-bestseller">
      <div class="card-bestseller__header">
        <span class="card-bestseller__title">Bestseller</span>
        <button class="card-bestseller__see-all">
          <span class="card-bestseller__see-all-text">See all 41</span>
          ${CHEVRON}
        </button>
      </div>
      <div class="card-bestseller__bets">
        ${BETS.map(betElement).join('')}
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Card Bestseller',
  render: () => renderCardBestseller(),
};

export const Default = {};

export const Overview = {
  render: () => `
    <div style="display:flex;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderCardBestseller()}
    </div>`,
};
