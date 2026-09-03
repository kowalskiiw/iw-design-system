import chevronSmallRaw from '../assets/icons/chevron-small.svg?raw';
import soccerRaw from '../assets/sports/soccer.svg?raw';
import basketballRaw from '../assets/sports/basketball.svg?raw';
import tennisRaw from '../assets/sports/tennis.svg?raw';
import hockeyRaw from '../assets/sports/hockey.svg?raw';
import starRaw from '../assets/sports/star.svg?raw';
import shirt1Raw from '../assets/sports/shirt-1.svg?raw';
import shirt2Raw from '../assets/sports/shirt-2.svg?raw';

function prep(svg, cls, key) {
  return svg
    .replace('<svg', `<svg class="${cls}"`)
    .replace(/id="([^"]+)"/g, `id="${key}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${key}-$1)`);
}

const CHEVRON = prep(chevronSmallRaw, 'card-live__see-all-icon', 'clchev');

// --- Tabs-big row ---------------------------------------------------------
const TAB_ICONS = {
  all: (k) => prep(starRaw, 'tab-big__icon', k),
  soccer: (k) => prep(soccerRaw, 'tab-big__icon', k),
  tennis: (k) => prep(tennisRaw, 'tab-big__icon', k),
  basketball: (k) => prep(basketballRaw, 'tab-big__icon', k),
  hockey: (k) => prep(hockeyRaw, 'tab-big__icon', k),
};

function tabBig({ count, label, icon, selected }, i) {
  const cls = selected ? 'tab-big tab-big--selected' : 'tab-big';
  return `<div class="${cls}">
    <span class="tab-big__count">${count}</span>
    ${TAB_ICONS[icon](`cltab${i}`)}
    <span class="tab-big__label">${label}</span>
  </div>`;
}

const TABS = [
  { count: '41', label: 'All', icon: 'all', selected: true },
  { count: '18', label: 'Football', icon: 'soccer' },
  { count: '9', label: 'Tennis', icon: 'tennis' },
  { count: '7', label: 'Basketball', icon: 'basketball' },
  { count: '4', label: 'Hockey', icon: 'hockey' },
];

function tabRow() {
  return `<div class="card-live__tabs">${TABS.map(tabBig).join('')}</div>`;
}

// --- Bet-element rows (reused) -------------------------------------------
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
        ${prep(shirt2Raw, 'bet-element__team-icon', `clb${i}s2`)}
        <span class="bet-element__team-name">${team1}</span>
      </div>
      <div class="bet-element__team">
        ${prep(shirt1Raw, 'bet-element__team-icon', `clb${i}s1`)}
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
          ${prep(soccerRaw, 'bet-element__league-icon', `clbl${i}`)}
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
];

function renderCardLive() {
  return `
    <div class="card-live">
      <div class="card-live__header">
        <span class="card-live__title">Live now</span>
        <button class="card-live__see-all">
          <span class="card-live__see-all-text">See all 41</span>
          ${CHEVRON}
        </button>
      </div>
      ${tabRow()}
      <div class="card-live__bets">
        ${BETS.map(betElement).join('')}
      </div>
    </div>`;
}

export default {
  title: 'IW Design System/Card Live',
  render: () => renderCardLive(),
};

export const Default = {};

export const Overview = {
  render: () => `
    <div style="display:flex;gap:16px;align-items:flex-start;font-family:Inter,sans-serif">
      ${renderCardLive()}
    </div>`,
};
