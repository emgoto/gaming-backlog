declare const TrelloPowerUp: any;
const t = TrelloPowerUp.iframe();
declare const Trello: any;
declare const axios: any;
declare const Sortable: any;

import { setToken, getSteamUser, setSteamUser, getSteamGameCache, createCard, createCards, getToken } from './trello-util';
import { getOwnedGames, SteamUser, SteamGame, getAppId, getGame } from './steam-util';

const serverURL = 'http://localhost:3000';
const clientURL = 'https://9d56a265.ngrok.io/docs';
// const clientURL = 'https://emgoto.github.io/gaming-backlog/';

// Cache for games while user has the settings page open
let cachedGames;

// Boolean for whether we are showing table or manual add
let isShowingManualAdd = false;

function onAuthenticate() {
  t.popup({
    type: 'confirm',
    title: 'Title',
    mouseEvent: event,
    message: 'message',
    confirmText: 'Authorize',
    onConfirm: () => {
      Trello.authorize({
        type: "popup",
        name: "name",
        expiration: "never",
        success: () => {
          setToken(t, Trello.token());
        },
        error: () => { },
      });
    },
  });
};

function onSteamAuth() {
  var signedURL = t.signUrl(`${clientURL}/settings.html`);
  window.location.href = `${serverURL}/done?signed=${encodeURIComponent(signedURL)}`;
  t.sizeTo(500);
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
        renderTable(cachedGames);
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
  var signedURL = t.signUrl(`${clientURL}/settings.html`);
  var serverURL2 = `${serverURL}?signed=${encodeURIComponent(signedURL)}`;

  const content = steamUser ? 
  `<img src=${steamUser.avatarUrl} id="steam-avatar"><span>Logged in as <b>${steamUser.displayName}</b></span><div id="steam-settings"></class>` :
  `<a href="${serverURL2}" target="_blank"><img id="steam-auth" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"></a>`;

  document.getElementById('steam-container').innerHTML = content;

  if (!steamUser) {
    document.getElementById('steam-auth').onclick = onSteamAuth;
  } else {
    const token = await getToken(t);
    document.getElementById('steam-settings').onclick = showMeatballsMenu(token);
  }
}

const renderTable = (games: SteamGame[] | void) => {
  isShowingManualAdd = false;

  document.querySelector('#manual-add-wrapper').classList.add('hidden');
  document.querySelector('#game-table-wrapper').classList.remove('hidden');

  if (!games) {
    return null; // TODO: Error handling here
  }

  const table: HTMLTableElement = document.querySelector('#game-table');
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
}

const onCreateManualCard = (id: number, token: string) => () => {
  const nameInput: HTMLInputElement = document.querySelector('#manual-add-name-input');
  const select: HTMLSelectElement = document.querySelector('#manual-add-games-list');
  const listId = select.value;

  createCard(t, listId, {name: nameInput.value, id, mins: null}, token).then(() => {
    document.querySelector('#manual-add-error').classList.add('hidden');
    document.querySelector('#manual-add-not-found').classList.add('hidden');
    document.querySelector('#manual-add-create-wrapper').classList.add('hidden');
    const input: HTMLInputElement = document.querySelector('#manual-add-input');
    input.value = '';
  });
}

const populateSelect = async (querySelectorString: string) => {
  const select: HTMLSelectElement = document.querySelector(querySelectorString);
  const lists = await t.lists('all');
  console.log('lists', lists);
  lists.forEach(list => {
    var option = document.createElement("option");
    option.text = list.name;
    option.value = list.id;
    select.add(option);
  })
}

const onManualSearch = (token: string) => async () => {
  document.querySelector('#manual-add-error').classList.add('hidden');
  document.querySelector('#manual-add-not-found').classList.add('hidden');
  const nameInput: HTMLInputElement = document.querySelector('#manual-add-name-input');
  nameInput.value = '';

  const input: HTMLInputElement = document.querySelector('#manual-add-input');
  const appId = getAppId(input.value);

  if (!appId) {
    document.querySelector('#manual-add-error').classList.remove('hidden');
    return;
  }

  // TODO: make button spinny 
  const game = await getGame(appId);
  console.log('got game', game);
  //TODO: stop spinner

  if (game === undefined) {
    document.querySelector('#manual-add-error').classList.remove('hidden');
    return;
  }

  if (game === null) {
    document.querySelector('#manual-add-not-found').classList.remove('hidden');
  }

  if (game) {
    const nameInput: HTMLInputElement = document.querySelector('#manual-add-name-input');
    nameInput.value = game;
  }

  const image = ` <img width="200" src="https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg"/>`;
  document.querySelector('#confirm-game').innerHTML = image;
  document.querySelector('#manual-add-create-wrapper').classList.remove('hidden');
  
  await populateSelect('#manual-add-games-list');

  const createButton: HTMLButtonElement = document.querySelector('#manual-create-card');
  createButton.onclick = onCreateManualCard(parseInt(appId, 10), token)
};

const renderManualAdd = (token: string) => {
  console.log('rendermanualadd');
  isShowingManualAdd = true;

  document.querySelector('#game-table-wrapper').classList.add('hidden');
  document.querySelector('#confirm-game').innerHTML = '';
  document.querySelector('#manual-add-create-wrapper').classList.add('hidden');
  document.querySelector('#manual-add-wrapper').classList.remove('hidden');

  const searchButton: HTMLButtonElement = document.querySelector('#manual-add');
  searchButton.onclick = onManualSearch(token);
};

// If we've newly been given an ID, we need to store it and call /games
async function onFirstRender() {
  if(!window.location.href.includes('?id=')) {
    // TODO: on first render we probably can just call the endpoint and grab all games
    // need to think about this one
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
  
  // TODO: if Steam endpoint returns {}, need to let user know their profile is private
  cachedGames = await getOwnedGames(t, id);
}

function onAddGames() {
  // TODO: Show spinner on button while cards are being created
  var checkedBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input:checked');
  const games = [];

  checkedBoxes.forEach(game => {
    games.push({name: game.value, id: game.name});
  });

  const select: HTMLSelectElement  = document.querySelector('#add-games-list');
  const listId = select.value;

  createCards(t, listId, games);
  // TODO: remove spinner on button
}

// t.render doesn't get called after we redirect back from authenticating with Steam
onFirstRender();

t.render(async function () {
  const steamUser = await getSteamUser(t);
  renderSteam(steamUser);

  const steamGames = await getSteamGameCache(t);
  renderTable(cachedGames || steamGames);

  // TODO: User must authenticate with Trello before they can add Trello cards
  const addButton: HTMLDivElement = document.querySelector('#add-games');
  addButton.onclick = onAddGames;

  await populateSelect('#add-games-list');

  t.sizeTo(500);
});
