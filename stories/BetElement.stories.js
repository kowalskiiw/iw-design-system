function soccerIcon(cls) {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.3"/>
    <path d="M12 7l4 3-1.5 4.5h-5L8 10z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>
  </svg>`;
}

function shirtIcon(cls) {
  return `<svg class="${cls}" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 2L2 4v2.5l1.5.5V14h9V7l1.5-.5V4l-3-2-1 1H6z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
  </svg>`;
}

function renderOdds() {
  const odds = [['1', '4.20'], ['X', '3.85'], ['2', '6.50']];
  return `<div class="bet-element__odds">${odds.map(([label, value]) => `
    <div class="odds-vertical">
      <span class="odds-vertical__label">${label}</span>
      <span class="odds-vertical__value">${value}</span>
    </div>`).join('')}</div>`;
}

function renderTeams(team1, team2) {
  return `
    <div class="bet-element__teams">
      <div class="bet-element__team">
        ${shirtIcon('bet-element__team-icon')}
        <span class="bet-element__team-name">${team1}</span>
      </div>
      <div class="bet-element__team">
        ${shirtIcon('bet-element__team-icon')}
        <span class="bet-element__team-name">${team2}</span>
      </div>
    </div>`;
}

function renderLive({ team1, team2 }) {
  return `
    <div class="bet-element bet-element--live">
      <div class="bet-element__meta">
        <span class="bet-element__live-label">LIVE</span>
        <span class="bet-element__live-clock">67′</span>
        <span class="bet-element__meta-text">2nd Half</span>
        <div class="bet-element__league">
          ${soccerIcon('bet-element__league-icon')}
          <span class="bet-element__league-name">Serie A</span>
        </div>
      </div>
      <div class="bet-element__matchup">
        ${renderTeams(team1, team2)}
        <div class="bet-element__score"><span>2</span><span>1</span></div>
      </div>
      ${renderOdds()}
    </div>`;
}

function renderDefault({ team1, team2 }) {
  return `
    <div class="bet-element bet-element--default">
      <div class="bet-element__meta">
        <div class="bet-element__date-chip">
          <span class="bet-element__date-chip-text bet-element__date-chip-text--day">Today</span>
          <span class="bet-element__date-chip-divider"></span>
          <span class="bet-element__date-chip-text bet-element__date-chip-text--time">21:15</span>
        </div>
        <div class="bet-element__league">
          ${soccerIcon('bet-element__league-icon')}
          <span class="bet-element__league-name">Serie A</span>
        </div>
      </div>
      <div class="bet-element__matchup">
        ${renderTeams(team1, team2)}
      </div>
      ${renderOdds()}
    </div>`;
}

export default {
  title: 'IW Design System/Bet Element',
  argTypes: {
    variant: { control: 'inline-radio', options: ['live', 'default'] },
    team1:   { control: 'text' },
    team2:   { control: 'text' },
  },
  args: {
    variant: 'live',
    team1: 'Atalanta Bergamasca Calcio',
    team2: 'Società Sportiva Lazio Roma',
  },
  render: ({ variant, team1, team2 }) =>
    variant === 'default' ? renderDefault({ team1, team2 }) : renderLive({ team1, team2 }),
};

export const Live    = {};
export const Default = { args: { variant: 'default' } };

export const Overview = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;width:336px;font-family:Inter,sans-serif">
      ${renderLive({ team1: 'Atalanta Bergamasca Calcio', team2: 'Società Sportiva Lazio Roma' })}
      ${renderDefault({ team1: 'Atalanta Bergamasca Calcio', team2: 'Società Sportiva Lazio Roma' })}
    </div>`,
};
