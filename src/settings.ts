declare const TrelloPowerUp: any;
const t = TrelloPowerUp.iframe();
declare const Trello: any;
declare const axios: any;
declare const Sortable: any;

import { setToken, getSteamUser, setSteamUser, getSteamGameCache, createCards } from './trello-util';
import { getOwnedGames, SteamUser, SteamGame } from './steam-util';

const serverURL = 'http://localhost:3000';
const clientURL = 'https://9d56a265.ngrok.io/docs'; // TODO: replace with real URL

// Cache for games while user has the settings page open
let cachedGames;

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

async function showMeatballsMenu() {
  t.popup({
    title: 'Steam settings',
    mouseEvent: event,
    items: [{
      text: 'Refresh games',
      callback: async function (t): Promise<void> {
        const games = await getOwnedGames(t);
        renderTable(games);
        cachedGames = games;
        t.closePopup();
      },
    },
    {
      text: 'Log out',
      callback: async function (t): Promise<void> {
        await setSteamUser(t, undefined);
        await axios.get(`${serverURL}/logout`);
        t.closePopup();
      },
    }]
  });
}

// If steam user exists, render their avatar and name, otherwise render the auth button
const renderSteam = (steamUser: SteamUser | void) => {
  var signedURL = t.signUrl(`${clientURL}/settings.html`);
  var serverURL2 = `${serverURL}?signed=${encodeURIComponent(signedURL)}`;

  const content = steamUser ? 
  `<img src=${steamUser.avatarUrl} id="steam-avatar"><span>Logged in as <b>${steamUser.displayName}</b></span><div id="steam-settings"></class>` :
  `<a href="${serverURL2}" target="_blank"><img id="steam-auth" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"></a>`;

  document.getElementById('steam-container').innerHTML = content;

  if (!steamUser) {
    document.getElementById('steam-auth').onclick = onSteamAuth;
  } else {
    document.getElementById('steam-settings').onclick = showMeatballsMenu;
  }
}

const renderTable = (games: SteamGame[] | void) => {
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
  
  try {
    // TODO: if Steam endpoint returns {}, need to let user know their profile is private
    cachedGames = await getOwnedGames(t, id);
  } catch(e) {
    console.log('e', e);
  }
}

function onAddGames() {
  // TODO: Show spinner on button while cards are being created
  var checkedBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input:checked');
  const games = [];

  checkedBoxes.forEach(game => {
    games.push({name: game.value, id: game.name});
  });

  // TODO: Render dropdown of lists

  t.lists('all').then(response => {
    createCards(t, response[0].id, games).then(() => {
      // TODO: remove spinner on button
    });
  });
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

  t.sizeTo(500);
});
