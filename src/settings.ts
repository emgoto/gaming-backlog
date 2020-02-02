declare const TrelloPowerUp: any;
const t = TrelloPowerUp.iframe();
declare const axios: any;
declare const Sortable: any;

import { getSteamUser, setSteamUser, getSteamGameCache, createCard, createCards, getToken, setSteamGameCache } from './trello-util';
import { getOwnedGames, SteamUser, SteamGame, getAppId, getGame } from './steam-util';

// const serverURL2 = 'https://trello-game-backlog.herokuapp.com';
const serverURL = 'https://backlog.emgoto.com';
const clientURL = 'https://emgoto.github.io/gaming-backlog';

// Cache for games while user has the settings page open
let cachedGames;

// Boolean for whether we are showing table or manual add
let isShowingManualAdd = false;

// Selectors
const MEATBALL_MENU_ID = 'meatball-menu';
const STEAM_AUTH_ID = 'steam-auth';

const STEAM_LOGGED_IN = '#steam-logged-in';
const STEAM_AUTH_CONTAINER = '#steam-auth-container';

const PROFILE_ERROR = '#profile-error-message';

const MANUAL_ADD = '#manual-add-wrapper';
const GAME_TABLE = '#game-table-wrapper';
const MANUAL_ADD_ERROR = '#manual-add-error';
const MANUAL_ADD_NOT_FOUND  = '#manual-add-not-found';
const MANUAL_ADD_CREATE = '#manual-add-create-wrapper';
const MANUAL_ADD_LIST = '#manual-add-games-list';
const MANUAL_ADD_NAME = '#manual-add-name-input';

const ADD_GAMES_WRAPPER = '#add-games-wrapper';
const CONFIRM_GAME = '#confirm-game';
const ADD_GAMES_LIST = '#add-games-list';
const ADD_GAMES = '#add-games-button';

function onSteamAuth() {
  var signedURL = t.signUrl(`${clientURL}/settings.html`);
  window.location.href = `${serverURL}/done?signed=${encodeURIComponent(signedURL)}`;
  t.sizeTo(200);
}

function showMeatballsMenu(token) {
  return function() {
    const firstItem = !isShowingManualAdd && token ? 
    {
      text: 'Add game manually',
      callback: async function (t2): Promise<void> {
        renderManualAdd(token);
        t2.closePopup();
      },
    } : 
    {
      text: 'Add owned games',
      callback: async function (t2): Promise<void> {
        const games = cachedGames ? cachedGames : await getSteamGameCache(t);
        renderTable(games);
        t2.closePopup();
      },
    };
  
    const secondItem = {
      text: 'Refresh games',
      callback: async function (t2): Promise<void> {
        const games = await getOwnedGames(t);
        renderTable(games);
        cachedGames = games;
        t2.closePopup();
      },
    };
    
    const thirdItem = {
      text: 'Log out',
      callback: async function (t2): Promise<void> {
        await setSteamUser(t, undefined);
        await setSteamGameCache(t, []);
        await axios.get(`${serverURL}/logout`);
        t2.closePopup();
      },
    };

    let items;

    if (!token) {
      items = [secondItem, thirdItem];
    } else {
      items = [firstItem, secondItem, thirdItem];
    }

    t.popup({
      title: 'Steam settings',
      mouseEvent: event,
      items,
    });
  }
}
// If steam user exists, render their avatar and name, otherwise render the auth button
const renderSteam = async (steamUser: SteamUser | void) => {
  if (steamUser) {
    const content = 
      `<img src=${steamUser.avatarUrl} id="steam-avatar">
        <span>Logged in as <b>${steamUser.displayName}</b></span>`;
    document.querySelector(STEAM_LOGGED_IN).innerHTML = content;
    const token = await getToken(t);
    document.getElementById(MEATBALL_MENU_ID).classList.remove('hidden');
    document.getElementById(MEATBALL_MENU_ID).onclick = showMeatballsMenu(token);
  } else {
    const content = 
    `<a href="${serverURL}" target="_blank">
      <img id="steam-auth" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png">
      </a>`;
    document.querySelector(STEAM_LOGGED_IN).innerHTML = '';
    document.querySelector(STEAM_AUTH_CONTAINER).innerHTML = content;
    document.getElementById(STEAM_AUTH_ID).onclick = onSteamAuth;
    document.getElementById(MEATBALL_MENU_ID).classList.add('hidden');
  }
}

const renderTable = (games: SteamGame[] | void) => {
  isShowingManualAdd = false;

  document.querySelector(MANUAL_ADD).classList.add('hidden');
  document.querySelector(GAME_TABLE).classList.remove('hidden');

  if (!games || games.length < 1) {
    document.querySelector(PROFILE_ERROR).classList.remove('hidden');
    document.querySelector(ADD_GAMES_WRAPPER).classList.add('hidden');
    t.sizeTo('#wrapper');
    return null;
  }

  document.querySelector(PROFILE_ERROR).classList.add('hidden');
  document.querySelector(ADD_GAMES_WRAPPER).classList.remove('hidden');

  const table: HTMLTableElement = document.querySelector(GAME_TABLE);
  const tableBody = table.getElementsByTagName('tbody')[0];

  // Remove all rows and start over
  $("#table_of_items tbody tr").remove();

  games.forEach(game => {
    const newRow = tableBody.insertRow(-1);
    const checkboxCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const hoursCell = newRow.insertCell(2);

    checkboxCell.innerHTML = `<input type="checkbox" value="${game.name}" name="${game.id}"></input>`;
    nameCell.innerHTML = game.name;
    hoursCell.innerHTML = Math.floor(game.mins / 60).toString();
  });

  Sortable.initTable(table);
  t.sizeTo('#wrapper');
}

const hideManualCreate = () => {
  document.querySelector(MANUAL_ADD_ERROR).classList.add('hidden');
  document.querySelector(MANUAL_ADD_NOT_FOUND).classList.add('hidden');
  document.querySelector(MANUAL_ADD_CREATE).classList.add('hidden');
  document.querySelector(CONFIRM_GAME).innerHTML = '';
  const nameInput: HTMLInputElement = document.querySelector(MANUAL_ADD_NAME);
  nameInput.value = '';
}

const onCreateManualCard = (id: number, token: string) => () => {
  const nameInput: HTMLInputElement = document.querySelector(MANUAL_ADD_NAME);
  const select: HTMLSelectElement = document.querySelector(MANUAL_ADD_LIST);
  const listId = select.value;

  createCard(t, listId, {name: nameInput.value, id, mins: null}, token).then(() => {
    hideManualCreate();
  });
}

const populateSelect = async (querySelectorString: string) => {
  const select: HTMLSelectElement = document.querySelector(querySelectorString);
  const lists = await t.lists('all');
  lists.forEach(list => {
    var option = document.createElement("option");
    option.text = list.name;
    option.value = list.id;
    select.add(option);
  })
}

const onManualSearch = (token: string) => async () => {
  const input: HTMLInputElement = document.querySelector('#manual-add-input');
  const appId = getAppId(input.value);

  hideManualCreate();

  if (!appId) {
    document.querySelector(MANUAL_ADD_ERROR).classList.remove('hidden');
    return;
  }

  // TODO: make button spinny 
  const game = await getGame(appId);
  //TODO: stop spinner

  if (game === undefined) {
    document.querySelector(MANUAL_ADD_ERROR).classList.remove('hidden');
    t.sizeTo('#wrapper');
    return;
  }

  if (game === null) {
    document.querySelector(MANUAL_ADD_NOT_FOUND).classList.remove('hidden');
  }

  if (game) {
    const nameInput: HTMLInputElement = document.querySelector(MANUAL_ADD_NAME);
    nameInput.value = game;
  }

  const image = ` <img height="40" src="https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg"/>`;
  document.querySelector(CONFIRM_GAME).innerHTML = image;
  document.querySelector(MANUAL_ADD_CREATE).classList.remove('hidden');
  
  await populateSelect(MANUAL_ADD_LIST);

  const createButton: HTMLButtonElement = document.querySelector('#manual-create-card');
  createButton.onclick = onCreateManualCard(parseInt(appId, 10), token);

  t.sizeTo('#wrapper');
};

const renderManualAdd = (token: string) => {
  isShowingManualAdd = true;

  document.querySelector(GAME_TABLE).classList.add('hidden');
  document.querySelector(CONFIRM_GAME).innerHTML = '';
  document.querySelector(MANUAL_ADD_CREATE).classList.add('hidden');
  document.querySelector(MANUAL_ADD).classList.remove('hidden');

  const searchButton: HTMLButtonElement = document.querySelector('#manual-add');
  searchButton.onclick = onManualSearch(token);

  t.sizeTo('#wrapper');
};

// If we've newly been given an ID, we need to store it and call /games
async function onFirstRender() {
  if(!window.location.href.includes('?id=')) {
    const steamUser = await getSteamUser(t);
    renderSteam(steamUser);
    return;
  }

  // Get list of params from URL
  const split: string[] = window.location.href.split('?');
  split.shift(); // remove first element
  const params = split.join();
  const urlParams = new URLSearchParams(params);
  
  const id = urlParams.get('id'); 
  const displayName = urlParams.get('name'); 
  const avatarUrl = urlParams.get('avatar'); 

  await setSteamUser(t, {id, displayName, avatarUrl});
  
  cachedGames = await getOwnedGames(t, id);
}

function onAddGames() {
  // TODO: Show spinner on button while cards are being created
  var checkedBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input:checked');
  const games = [];

  checkedBoxes.forEach(game => {
    games.push({name: game.value, id: game.name});
  });

  const select: HTMLSelectElement  = document.querySelector(ADD_GAMES_LIST);
  const listId = select.value;

  createCards(t, listId, games);
  // TODO: remove spinner on button
}

// t.render doesn't get called after we redirect back from authenticating with Steam
// it will get called once we store something using t.set
onFirstRender();

t.render(async function () {
  const steamUser = await getSteamUser(t);
  renderSteam(steamUser);

  const steamGames = await getSteamGameCache(t);

  if (steamUser) {
    renderTable(cachedGames || steamGames);
    const addButton: HTMLDivElement = document.querySelector(ADD_GAMES);
    addButton.onclick = onAddGames;
    await populateSelect(ADD_GAMES_LIST);
    document.querySelector(GAME_TABLE).classList.remove('hidden');
  } else {
    // We do check for token existence before we get to this point so hypothetically should exist
    const token = await getToken(t) || '';
    renderManualAdd(token);
  }
});
